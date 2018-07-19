import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = ["one", "two", "three"];
const defaultOption = options[0];

class MetricDropdown extends Component {
  state = {};

  _onSelect = item => {
    console.log(item);
  };

  render() {
    return (
      <Dropdown
        options={options}
        onChange={this._onSelect}
        value={defaultOption}
        placeholder="Select an option"
      />
    );
  }
}

export default MetricDropdown;
