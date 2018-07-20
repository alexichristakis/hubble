import React, { Component } from "react";
import Select from "react-select";

import AvailableMetrics from "../metrics/available-metrics";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};

const MetricDropdown = props => {
  const handleOnChange = item => {
    props.onMetricSelect(item);
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "none"
    }),
  }

  return (
    <div style={{ width: "25%", marginRight: "600px", marginLeft: "15px"}}>
      <Select
        placeholder={"Select a metric"}
        onChange={handleOnChange}
        options={AvailableMetrics}
        formatGroupLabel={formatGroupLabel}
        styles = {customStyles}
      />
    </div>
  );
};

export default MetricDropdown;
