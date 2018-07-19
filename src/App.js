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

  updateKeplerData = (data, latLng) => {
    // until we get the api call to return the json object
    data = sampleData;

    const { dataSetKey } = this.state;
    if (dataSetKey !== "") this.props.dispatch(wrapTo(KEPLER_ID, removeDataset(dataSetKey)));

    const { lat, lng } = latLng;
    const mapState = {
      latitude: lat,
      longitude: lng,
      zoom: 5
    };
    const keplerConfig = { mapState };

    this.setState({ dataSetKey: data.info.id }, () =>
      this.props.dispatch(
        wrapTo(
          KEPLER_ID,
          addDataToMap({
            datasets: data,
            options: {
              centerMap: true
            },
            config: keplerConfig
          })
        )
      )
    );
  };

  handleSelect = (result, latLng) => {
    this.setState({ region: latLng });

    let query = {
      type: 0, // 0 -> country, 1 -> state, 2 -> county
      state: "",
      county: ""
    };

    const components = result.address_components;
    const firstComp = components[0];
    const firstCompArray = firstComp.long_name.split(" ");
    if (firstComp.short_name.length === 2) {
      query.type = 1;
      query.state = firstComp.short_name;
      // console.log("this is a state: ", query);
    } else if (firstCompArray[firstCompArray.length - 1] === "County") {
      query.type = 2;
      query.county = firstComp.long_name;
      query.state = components[1].short_name;
      // console.log("this is a county: ", query);
    } else {
      console.log("this is a city"); // please enter a state to see county in that state or a county to see cities in that county
    }

    console.log("query: ", query);
    this.updateKeplerData(query, latLng);
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
        <DataSetSelection />
        {/* <LocationSearchInput handleSelect={this.handleSelect} /> */}
        {/* <FullScreenButton id={KEPLER_ID} /> */}
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
