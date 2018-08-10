import React, { Component } from "react";

import LocationSearchInput from "./LocationSearchInput";
import MetricDropdown from "./MetricDropdown";

import { buildRegionObject } from "../../util";

const containerStyle = {
  position: "absolute",
  display: "flex",
  paddingLeft: "358px",
  marginRight: "200px",
  flexDirection: "row",
  top: 20,
  left: 0,
  right: 0,
  fontFamily: "Helvetica",
  border: "none"
};

class DatasetSelection extends Component {
  state = {
    firstMetric: "",
    secondMetric: "",
    currentAddress: ""
  };

  dropdownRef1 = React.createRef();
  dropdownRef2 = React.createRef();

  onSelectFirstMetric = firstMetric => {
    this.setState({ firstMetric }, () => {
      this.props.onSelectMetric({
        metric: firstMetric.value,
        region: this.props.region
      });
    });
  };

  onSelectSecondMetric = secondMetric => {
    this.setState({ secondMetric }, () => {
      this.props.onSelectComparisonMetric({
        metric: secondMetric.value,
        region: this.props.region
      });
    });
  };

  onSelectRegion = (result, latLng) => {
    // console.log(this.dropdownRef);
    this.dropdownRef1.current.select.commonProps.clearValue();
    // this.dropdownRef2.current.select.commonProps.clearValue();

    this.setState(
      {
        firstMetric: "",
        secondMetric: "",
        currentAddress: result.formatted_address
      },
      () => {
        const region = buildRegionObject({ result, latLng });
        console.log(region);
        this.props.onSelectRegion(region);
      }
    );
  };

  handleCloseClick = () => {
    this.setState({ currentAddress: "" });
  };

  handleChangeAddress = address => {
    this.setState({ currentAddress: address });
  };

  render() {
    return (
      <div style={containerStyle}>
        <LocationSearchInput
          onSelectRegion={this.onSelectRegion}
          handleChange={this.handleChangeAddress}
          handleCloseClick={this.handleCloseClick}
          address={this.state.currentAddress}
        />
        <MetricDropdown
          dropdownRef={this.dropdownRef1}
          availableMetrics={this.props.availableMetrics}
          onSelectMetric={this.onSelectFirstMetric}
        />
        {this.state.firstMetric !== "" && <div style={{ fontSize: 36, paddingLeft: 10 }}>/</div>}
        {this.state.firstMetric !== "" && (
          <MetricDropdown
            // dropdownRef={this.dropdownRef2}
            availableMetrics={this.props.availableMetrics}
            onSelectMetric={this.onSelectSecondMetric}
          />
        )}
      </div>
    );
  }
}

export default DatasetSelection;
