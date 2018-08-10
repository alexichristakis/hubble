import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { addDataToMap, removeDataset, wrapTo } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";
import _ from "lodash";

import {
  processMetricData,
  formatConfig,
  formatMap,
  getMetricKey,
  formatMetricList,
  generateComparision
} from "../util";

import LoadingOverlay from "./LoadingOverlay";
import DatasetSelection from "./DatasetSelection";

import CustomMapControl from "./CustomKeplerComponents/CustomMapControl";
import CustomHeader from "./CustomKeplerComponents/CustomHeader";

import defaultData from "../data/WA_King_Seattle.json";

import BaseConfig from "../configurations/config.json";
import MsaConfig from "../configurations/msa.json";

import { injectComponents, MapControlFactory, PanelHeaderFactory } from "kepler.gl/components";

import { GetMetricData, GetRegionData } from "../api";

const myCustomHeaderFactory = () => CustomHeader;
const customControlFactory = () => CustomMapControl;

// Inject custom components into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  [MapControlFactory, customControlFactory],
  [PanelHeaderFactory, myCustomHeaderFactory]
]);

const KEPLER_ID = "map";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
// const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const REGION_DATA_ID = "regionDataID";
const METRIC_DATA_ID = "metricDataID";

const defaultRegion = {
  latLng: {
    lat: 47.61484799999589,
    lng: -122.33556069699992
  },
  state: "WA",
  county: "King",
  city: "Seattle",
  regionType: 3
};

class App extends Component {
  state = {
    loading: true,
    width: window.innerWidth,
    height: window.innerHeight,
    region: defaultRegion,
    availableMetrics: [],
    regionData: Processors.processGeojson(defaultData),
    metricData: {},
    ratioData: {}
  };

  componentWillMount() {
    window.addEventListener("resize", this._onResize);
    this._onResize();
  }

  componentDidMount() {
    this.updateVisKeplerData();
    GetRegionData(this.state.region).then(data => {
      const { regionData, availableMetrics } = data;
      this.setState(
        {
          loading: false,
          rawRegionData: regionData,
          availableMetrics: formatMetricList(availableMetrics)
        },
        () => {
          this.updateVisKeplerData();
        }
      );
    });
  }

  clearKeplerData = () => {
    this.setState({ regionData: {}, metricData: {}, ratioData: {} }, () => {
      this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(REGION_DATA_ID)));
      this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(METRIC_DATA_ID)));
    });
  };

  updateVisKeplerData = () => {
    const { metricData, regionData, ratioData, region } = this.state;
    const { regionType, latLng } = region;

    let metric;
    if (_.isEmpty(ratioData)) metric = metricData;
    else metric = ratioData;

    // console.log(ratioData);

    // const processedMetricData = processMetricData(rawMetricData);
    // const processedRegionData = Processors.processGeojson(rawRegionData);

    formatConfig({ config: BaseConfig, region, metric });

    if (_.isEmpty(metric)) formatMap({ config: BaseConfig, latLng, regionType });
    else formatMap({ config: BaseConfig, is3D: true, latLng, regionType });

    this.props.dispatch(
      addDataToMap({
        datasets: [
          { info: { id: REGION_DATA_ID, label: "Region Data" }, data: regionData },
          {
            info: { id: METRIC_DATA_ID, label: getMetricKey(metric) },
            data: metric
          }
        ],
        options: { centerMap: true },
        config: regionType === 0 ? MsaConfig : BaseConfig
      })
    );
  };

  onSelectRegion = region => {
    this.clearKeplerData();
    this.setState({ region, loading: true }, () => {
      /* fetch data from s3 */
      GetRegionData(region)
        .then(data => {
          const { regionData, availableMetrics } = data;
          this.setState(
            {
              loading: false,
              regionData: Processors.processGeojson(regionData),
              availableMetrics: formatMetricList(availableMetrics)
            },
            () => {
              this.updateVisKeplerData();
            }
          );
        })
        .catch(error => {
          console.log("Region: ", region, " not found. zooming out...");
          region.regionType = region.regionType - 1;
          this.onSelectRegion(region);
        });
    });
  };

  onSelectMetric = query => {
    console.log(query);
    this.setState({ loading: true }, () => {
      /* fetch data from s3 */
      GetMetricData(query).then(data => {
        this.setState({ loading: false, metricData: processMetricData(data) }, () => {
          this.updateVisKeplerData();
        });
      });
    });
  };

  onSelectComparisonMetric = query => {
    console.log(query);
    this.setState({ loading: true }, () => {
      GetMetricData(query).then(data => {
        const metricData1 = this.state.metricData;
        const metricData2 = processMetricData(data);

        console.log("metricData1: ", metricData1);
        console.log("metricData2: ", metricData2);

        const ratioData = generateComparision({ table1: metricData1, table2: metricData2 });

        this.setState({ loading: false, ratioData }, () => {
          this.updateVisKeplerData();
        });
      });
    });
  };

  _onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    const { width, height } = this.state;
    return (
      <Fragment>
        <KeplerGl
          mapboxApiAccessToken={MAPBOX_TOKEN}
          id={KEPLER_ID}
          width={width}
          height={height}
        />
        <DatasetSelection
          loadingMetrics={this.state.loading}
          region={this.state.region}
          onSelectRegion={this.onSelectRegion}
          availableMetrics={this.state.availableMetrics}
          onSelectMetric={this.onSelectMetric}
          onSelectComparisonMetric={this.onSelectComparisonMetric}
        />
        {this.state.loading && <LoadingOverlay />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  dispatchToProps
)(App);
