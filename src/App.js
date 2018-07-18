import React, { Component } from "react";

import { addDataToMap, wrapTo } from "kepler.gl/actions";
import KeplerGl from "kepler.gl";

// import mock data from some json file

console.log(process.env);
// const MAPBOX_TOKEN = process.env.MapboxAccessToken;
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxleGljIiwiYSI6ImNqanE1emM3cDJ0czczcnNvcGQwZmFiNDcifQ.OY9UfSfy-p0uL43FaQwDJA";

console.log(window);

class App extends Component {
  state = {
    dataSet: 0,
    width: window.innerWidth,
    height: window.innerHeight
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
      <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id={"map"} width={width} height={height} />
    );
  }
}

export default App;
