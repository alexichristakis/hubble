import React, { Component } from "react";

import LocationSearchInput from "./LocationSearchInput";
import MetricDropdown from "./MetricDropdown";

class DataSetSelection extends Component {
  state = {
    selectedMetric: "",
    selectedRegion: { state: "CA", county: "San Francisco", city: "San Francisco" }
  };

  handleOnSelectMetric = selectedMetric => {
    this.setState({ selectedMetric }, () => {
      const { selectedMetric, selectedRegion } = this.state;
      const query = {
        metric: selectedMetric,
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
          flexDirection: "row",
          top: 20,
          left: 375
        }}
      >
        <LocationSearchInput onSelectRegion={this.handleOnSelectRegion} />
        <MetricDropdown
          onMetricSelect={this.handleOnSelectMetric}
          availableMetrics={[0, 1, 2, 3, 4]}
        />
      </div>
    );
  }
}

export default DataSetSelection;
