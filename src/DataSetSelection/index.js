import React, { Component } from "react";

import LocationSearchInput from "./LocationSearchInput";
import MetricDropdown from "./MetricDropdown";

const defaultRegion = {
  state: "CA",
  county: "San Francisco",
  city: "San Francisco",
  regionType: 3
};

const containerStyle = {
  position: "absolute",
  display: "flex",
  paddingLeft: "358px",
  flexDirection: "row",
  top: 20,
  left: 0,
  right: 0,
  fontFamily: "Helvetica",
  border: "none"
};

class DatasetSelection extends Component {
  state = {
    selectedMetric: "",
    selectedRegion: defaultRegion,
    currentAddress: ""
  };

  onSelectMetric = (selectedMetric) => {
    this.setState({ selectedMetric: selectedMetric }, () => {
      this.props.onSelectMetric({
            metric: this.state.selectedMetric.value,
            region: this.state.selectedRegion
        })
      }
    );
    console.log(selectedMetric)
    
  };

  onSelectRegion = (result, latLng) => {
    let region = {
      state: "",
      county: "",
      city: "",
      regionType: 0
    };

    const components = result.address_components;
    const firstComp = components[0];
    const firstCompArray = firstComp.long_name.split(" ");
    if (firstComp.short_name.length === 2) {
      region.state = firstComp.short_name;
      region.regionType = 1;
    } else if (firstCompArray[firstCompArray.length - 1] === "County") {
      const lastIndex = firstComp.long_name.lastIndexOf(" ");
      region.county = firstComp.long_name.substring(0, lastIndex);
      region.state = components[1].short_name;
      region.regionType = 2;
    } else {
      region.city = firstComp.long_name;
      const lastIndex = components[1].long_name.lastIndexOf(" ");
      region.county = components[1].long_name.substring(0, lastIndex);
      region.state = components[2].short_name;
      region.regionType = 3;
    }
    console.log(region);

    this.setState(
      { 
        selectedRegion: region, 
        currentAddress: result.formatted_address 
      }
    );
    this.props.onSelectRegion(region);
  };

  render() {
    const handleCloseClick = () => {
      this.setState({ currentAddress: "" });
    };

    const handleChange = address => {
      this.setState({ currentAddress: address });
    };

    return (
      <div style={containerStyle}>
        <LocationSearchInput onSelectRegion={this.onSelectRegion} handleChange={handleChange} 
        handleCloseClick={handleCloseClick} address={this.state.currentAddress}/>
        <MetricDropdown onSelectMetric={this.onSelectMetric}/>
      </div>
    );
  }
}

export default DatasetSelection;
