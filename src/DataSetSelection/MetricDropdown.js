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
  const _onSelect = item => {
    props.onMetricSelect(item);
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div style={{ width: 400 }}>
      <Select
        placeholder={"Select a metric"}
        options={AvailableMetrics}
        formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
};

export default MetricDropdown;
