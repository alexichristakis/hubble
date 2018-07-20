import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { addDataToMap, updateVisData, removeDataset, wrapTo } from "kepler.gl/actions";
// import KeplerGl from "kepler.gl";
import Processors from "kepler.gl/processors";
// import Processors from "./processors";

import DatasetSelection from "./DatasetSelection";

// import LocationSearchInput from "./LocationSearchInput";
import CustomMapControl from "./CustomMapControl";
import CustomHeader from "./CustomHeader";

import sampleData from "./data/sample-data";
import sampleGeo from "./data/sample-geojson.json";
import defaultData from "./data/WA_King.json";
import config from "./configurations/config.json";

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

class App extends Component {
  state = {
    dataSetKey: "",
    geoJsonKey: "",
    availableMetrics: [],
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentWillMount() {
    window.addEventListener("resize", this._onResize);
    this._onResize();
  }

  async componentDidMount() {
    // this.updateKeplerData(sampleData);
    /* fetch available metrics */
    // this.setState({ availableMetrics: [0, 1, 2, 3, 4, 5] });
    console.log("componentDidMount");
    Test().then(result => this.updateKeplerMetricData(result));
    // console.log(result);

    this.updateKeplerRegionData(defaultData);

    // GetRegionData({ regionType: "County", state: "WA", county: "King" }).then(result =>
    //   console.log(result)
    // );
  }

  clearKeplerData = () => {
    const { dataSetKey, geoJsonKey } = this.state;
    this.props.dispatch(wrapTo(KEPLER_ID, removeDataset("test")));
    if (dataSetKey !== "") this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(dataSetKey)));
    if (geoJsonKey !== "") this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(geoJsonKey)));
  };

  updateKeplerMetricData = data => {
    console.log(data);
    this.props.dispatch(
      updateVisData({
        info: { id: "test" },
        data: Processors.processCsvData(data.data)
      })
    );

    // this.clearKeplerData();
    // this.setState({ dataSetKey: data.info.id }, () =>
    // this.props.dispatch(
    //   wrapTo(
    //     KEPLER_ID,
    //     addDataToMap({
    //       datasets: data,
    //       options: {
    //         centerMap: true
    //       }
    //     })
    //   )
    // );
    // );
  };

  updateKeplerRegionData = geoJson => {
    // console.log(geoJson);
    // this.props.dispatch(
    //   updateVisData(
    //     // datasets
    //     {
    //       info: {
    //         label: "Sample Taxi Trips in New York City",
    //         id: "test_trip_data"
    //       },
    //       data: geoJson
    //     },
    //     // option
    //     {
    //       centerMap: true,
    //       readOnly: false
    //     }
    //     // config
    //   )
    // );
    this.props.dispatch(
      updateVisData({
        info: { id: "test", label: "Cities in King County WA" },
        data: Processors.processGeojson(geoJson)
      })
    );

    // this.clearKeplerData(); // new region, clear all old data
    // this.setState({ geoJsonKey: geoJson.info.id }, () =>
    // this.props.dispatch(
    //   wrapTo(
    //     KEPLER_ID,
    //     // addDataToMap({
    //     //   datasets: geoJson,
    //     //   options: {
    //     //     centerMap: true
    //     //   }
    //     // })
    //   )
    // );
    // // );
  };

  onSelectRegion = (region) => {
    this.clearKeplerData(); // new position, clear all old data

    // TODO: Make api call

    /*this.updateKeplerRegionData(geoJson);

    const keplerConfig = { mapState };
    this.props.dispatch(
      wrapTo(
        KEPLER_ID,
        addDataToMap({
          datasets: {},
          config: keplerConfig
        })
      )
    );*/
  };

  onSelectMetric = query => {
    console.log("QUERY: ", query);

    /* make request from API */
    GetMetricData(query).then(data => this.updateKeplerData(data));
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
