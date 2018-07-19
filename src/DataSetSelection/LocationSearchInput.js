import React, { Component } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import styles from "./LocationSearchInputStyle";

class LocationSearchInput extends Component {
  state = {
    address: ""
  };

  handleChange = address => {
    this.setState({ address });
  };

  onPressResult = async address => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    this.props.handleSelect(results[0], latLng);
  };

  render() {
    const searchOptions = {
      types: ["(regions)"]
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.onPressResult}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={styles.search_bar_container}>
            <input
              {...getInputProps({
                placeholder: "Search Places...",
                style: styles.search_bar_input
              })}
            />
            <div style={styles.search_bar_dropdown_container}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { width: "100%", backgroundColor: "#fafafa", cursor: "pointer" }
                  : { width: "100%", backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
