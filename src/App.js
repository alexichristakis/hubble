import React, { Component } from "react";

import { addDataToMap, wrapTo } from "kepler.gl/actions";
import KeplerGl from "kepler.gl";
import LocationSearchInput from "./LocationSearchInput";

// import mock data from some json file

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSet: 0,
      address: "",
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = result => {
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
      <div>
        <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id={"map"} width={width} height={height} />
        <LocationSearchInput
          address={this.state.address}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default App;
