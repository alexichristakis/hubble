import React, { Component } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import styles from "./LocationSearchInputStyle";

import "./LocationSearchInput.css";

const classnames = (...args) => {
  const isObject = val => {
    return typeof val === "object" && val !== null;
  };

  const classes = [];
  args.forEach(arg => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (isObject(arg)) {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    } else {
      throw new Error("`classnames` only accepts string or object as arguments");
    }
  });

  return classes.join(" ");
};

class LocationSearchInput extends Component {
  onPressResult = async address => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log(results, latLng);
    this.props.onSelectRegion(results[0], latLng);
  };

  render() {
    const searchOptions = {
      types: ["(regions)"]
    };

    return (
      <div style={{ width: "50%", overflow: "hidden" }}>
        <PlacesAutocomplete
          onChange={this.props.handleChange}
          value={this.props.address}
          onSelect={this.onPressResult}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="search-bar-container">
                <div className="search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: "Search States, Counties, or Cities",
                      className: "search-input"
                    })}
                  />
                  {this.props.address.length > 0 && (
                    <button className="clear-button" onClick={this.props.handleCloseClick}>
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="autocomplete-container">
                    {suggestions.map(suggestion => {
                      if (suggestion.terms[suggestion.terms.length - 1].value === "USA") {
                        const className = classnames("suggestion-item", {
                          "suggestion-item--active": suggestion.active
                        });

                        return (
                          /* eslint-disable react/jsx-key */
                          <div {...getSuggestionItemProps(suggestion, { className })}>
                            <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                            <small>{suggestion.formattedSuggestion.secondaryText}</small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      }
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default LocationSearchInput;
