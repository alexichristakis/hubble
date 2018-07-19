import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { addDataToMap, removeDataset, wrapTo } from "kepler.gl/actions";
// import KeplerGl from "kepler.gl";

import DataSetSelection from "./DataSetSelection";

// import LocationSearchInput from "./LocationSearchInput";
import CustomMapControl from "./CustomMapControl";

import sampleData from "./data/sample-data";
import config from "./configurations/config.json";

import { injectComponents, MapControlFactory, ModalContainerFactory } from "kepler.gl/components";

// define custom components
const Empty = () => <div />;

const customControlFactory = () => CustomMapControl;
const customModalContainerFactory = () => Empty;

// Inject custom components into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  // [MapControlFactory, customControlFactory],
  [ModalContainerFactory, customModalContainerFactory]
]);

const KEPLER_ID = "map";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class App extends Component {
  state = {
    dataSetKey: "",
    width: window.innerWidth,
    height: window.innerHeight
  };

  // componentDidMount() {
  //   this.updateKeplerData(sampleData);
  // }

  clearKeplerData = () => {
    const { dataSetKey } = this.state;
    if (dataSetKey !== "") this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(dataSetKey)));
  };

  updateKeplerData = data => {
    this.clearKeplerData();

    this.setState({ dataSetKey: data.info.id }, () =>
      this.props.dispatch(
        wrapTo(
          KEPLER_ID,
          addDataToMap({
            datasets: data,
            options: {
              centerMap: true
            }
          })
        )
      )
    );
  };

  updateKeplerPosition = ({ lat, lng }) => {
    this.clearKeplerData();
    const mapState = {
      latitude: lat,
      longitude: lng,
      zoom: 5
    };

    const keplerConfig = { mapState };
    this.props.dispatch(
      wrapTo(
        KEPLER_ID,
        addDataToMap({
          datasets: {},
          config: keplerConfig
        })
      )
    );
  };

  handleOnRequestMetric = query => {
    console.log("QUERY: ", query);
    /* make request from API */
    const data = sampleData;
    this.updateKeplerData(data);
  };

  componentWillMount() {
    window.addEventListener("resize", this._onResize);
    this._onResize();
  }

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
        <DataSetSelection
          onSelectRegion={this.updateKeplerPosition}
          onRequestMetric={this.handleOnRequestMetric}
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
