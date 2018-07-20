import React, { Component } from "react";

import LocationSearchInput from "./LocationSearchInput";
import MetricDropdown from "./MetricDropdown";

const defaultRegion = { state: "CA", county: "San Francisco", city: "San Francisco" };

class DatasetSelection extends Component {
  state = {
    selectedMetric: "",
    selectedRegion: defaultRegion
  };

  handleOnSelectMetric = selectedMetric => {
    this.setState({ selectedMetric }, () => {
      const { selectedMetric, selectedRegion } = this.state;
      const query = {
        metric: selectedMetric.value,
        region: selectedRegion
      };
      this.props.onRequestMetric(query);
    });
  };

  handleOnSelectRegion = (result, latLng) => {
    this.setState({ region: latLng });

    let region = {
      state: "",
      county: "",
      city: ""
    };

    const components = result.address_components;
    const firstComp = components[0];
    const firstCompArray = firstComp.long_name.split(" ");
    if (firstComp.short_name.length === 2) {
      region.state = firstComp.short_name;
      // console.log("this is a state: ", region);
    } else if (firstCompArray[firstCompArray.length - 1] === "County") {
      region.county = firstComp.long_name;
      region.state = components[1].short_name;
      // console.log("this is a county: ", query);
    } else {
      console.log("this is a city"); // please enter a state to see county in that state or a county to see cities in that county
    }

    this.setState({ selectedRegion: region }, () => this.props.onSelectRegion(latLng));
  };

  render() {

    return (
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: "100%",
          flexDirection: "row",
          top: 20,
          left: 0,
          paddingLeft: 360,
          fontFamily: "Helvetica",
          border: "none"
        }}
      >
        <LocationSearchInput onSelectRegion={this.handleOnSelectRegion} />
        <MetricDropdown
          onMetricSelect={this.handleOnSelectMetric}
          // availableMetrics={this.props.availableMetrics}
        />
      </div>
    );
  }
}

export default DatasetSelection;
