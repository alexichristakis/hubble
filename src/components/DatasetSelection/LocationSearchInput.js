import React from "react";
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

const LocationSearchInput = props => {
  const onPressResult = async address => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log(results, latLng);
    props.onSelectRegion(results[0], latLng);
  };

  const searchOptions = {
    types: ["(regions)"],
    componentRestrictions: { country: "us" }
  };

  return (
    <div style={{ width: "50%", overflow: "hidden" }}>
      <PlacesAutocomplete
        onChange={props.handleChange}
        value={props.address}
        onSelect={onPressResult}
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
                {props.address.length > 0 && (
                  <button className="clear-button" onClick={props.handleCloseClick}>
                    x
                  </button>
                )}
              </div>
              {suggestions.length > 0 && (
                <div className="autocomplete-container">
                  {suggestions.map(suggestion => {
                    const className = classnames("suggestion-item", {
                      "suggestion-item--active": suggestion.active
                    });
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className })}>
                        <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                        <small>{suggestion.formattedSuggestion.secondaryText}</small>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationSearchInput;
