import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { addDataToMap, updateVisData, removeDataset, wrapTo } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";

import DatasetSelection from "./DatasetSelection";

import CustomMapControl from "./CustomMapControl";
import CustomHeader from "./CustomHeader";

import sampleData from "./data/sample-data";
import sampleGeo from "./data/sample-geojson.json";
import defaultData from "./data/WA_King.json";
// import config from "./configurations/config.json";
import config from "./configurations/default_WA_config.json";

import {
  injectComponents,
  MapControlFactory,
  ModalContainerFactory,
  PanelHeaderFactory
} from "kepler.gl/components";

import { Test, GetMetricData, GetRegionData } from "./api";

// define custom components
const Empty = () => <div />;

const myCustomHeaderFactory = () => CustomHeader;
const customControlFactory = () => CustomMapControl;
const customModalContainerFactory = () => Empty;

// Inject custom components into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  // [ModalContainerFactory, customModalContainerFactory],
  [MapControlFactory, customControlFactory],
  [PanelHeaderFactory, myCustomHeaderFactory]
]);

const KEPLER_ID = "map";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const REGION_DATA_ID = "regionDataID";
const METRIC_DATA_ID = "metricDataID";

class App extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentWillMount() {
    window.addEventListener("resize", this._onResize);
    this._onResize();
  }

  componentDidMount() {
    console.log(config);
    // Test().then(result => this.updateKeplerMetricData(result));
    this.updateKeplerRegionData(defaultData);
  }

  clearKeplerData = () => {
    this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(REGION_DATA_ID)));
    this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(METRIC_DATA_ID)));
  };

  updateKeplerMetricData = data => {
    this.props.dispatch(
      updateVisData({
        info: { id: METRIC_DATA_ID },
        data: Processors.processCsvData(data)
      })
    );
  };

  updateKeplerRegionData = geoJson => {
    this.props.dispatch(
      addDataToMap({
        datasets: [{ info: { id: REGION_DATA_ID }, data: Processors.processGeojson(geoJson) }],
        options: { centerMap: true },
        config
      })
      // updateVisData(
      //   {
      //     info: { id: REGION_DATA_ID },
      //     data: Processors.processGeojson(geoJson)
      //   },
      //   {
      //     centerMap: true,
      //     readOnly: false
      //   },
      //   {
      //     ...default_config
      //   }
      // )
    );
  };

  moveMapTo = ({ lat, lng }) => {
    const mapState = {
      latitude: lat,
      longitde: lng,
      zoom: 7
    };

    const config = { mapState };

    this.props.dispatch(
      wrapTo(
        KEPLER_ID,
        addDataToMap({
          datasets: {},
          config
        })
      )
    );
  };

  onSelectRegion = region => {
    this.clearKeplerData();
    this.moveMapTo(region.latLng);
    GetRegionData(region).then(data => this.updateKeplerRegionData(data));
  };

  onSelectMetric = query => {
    GetMetricData(query).then(data => this.updateKeplerMetricData(data));
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
          onSelectRegion={this.onSelectRegion}
          availableMetrics={this.state.availableMetrics}
          onSelectMetric={this.onSelectMetric}
        />
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
