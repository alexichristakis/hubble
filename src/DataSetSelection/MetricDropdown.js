import React from "react";
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
      border: "none",
      borderRadius: "0px",
      fontWeight: "400",
      fontSize: "16px",
      backgroundColor: "#29323c"
    }),
    groupHeading: (base, state) => ({
      ...base,
      fontSize: "16px",
      color: "#1CBAD6",
      fontWeight: "600"
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "white"
    }),
    indicatorSeparator: (base, state) => ({
      ...base,
      backgroundColor: "#29323c"
    }),
    menu: (base, state) => ({
      ...base,
      borderRadius: "0px",
      backgroundColor: "#252731"
    }),
    group: (base, state) => ({
      ...base,
      backgroundColor: "#252731"
    }),
    option: (base, state) => ({
      ...base,
      marginLeft: "2%",
      maxWidth: "98%",
      backgroundColor: state.isFocused ? "#697485" : "#252731",
      color: "#CAE9F4"
    })
  };

  return (
    <div style={{ width: "50%", marginRight: "200px", marginLeft: "15px" }}>
      <Select
        placeholder={"Select a metric"}
        onChange={handleOnChange}
        options={AvailableMetrics}
        formatGroupLabel={formatGroupLabel}
        styles={customStyles}
      />
    </div>
  );
};

export default MetricDropdown;
