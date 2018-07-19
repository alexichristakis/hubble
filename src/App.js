import React, { Component } from "react";

import { addDataToMap, wrapTo } from "kepler.gl/actions";
import KeplerGl from "kepler.gl";
import LocationSearchInput from "./LocationSearchInput"

// import mock data from some json file

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSet: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

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
      <div>
        <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id={"map"} width={width} height={height} />
        <LocationSearchInput />
      </div>
    );
  }
}

export default App;
