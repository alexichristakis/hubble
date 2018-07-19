import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// const options = ["one", "two", "three"];
// const defaultOption = options[0];

const MetricDropdown = props => {
  const _onSelect = item => {
    props.onMetricSelect(item);
  };

  return (
    <Dropdown options={props.availableMetrics} onChange={_onSelect} placeholder="Select a metric" />
  );
};

export default MetricDropdown;
