import React, { Component } from "react";

import LocationSearchInput from "./LocationSearchInput";
import MetricDropdown from "./MetricDropdown";

class DataSetSelection extends Component {
  state = {
    selectedMetric: ""
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
        <LocationSearchInput />
        <MetricDropdown />
      </div>
    );
  }
}

export default DataSetSelection;
