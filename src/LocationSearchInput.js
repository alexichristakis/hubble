import React from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationSearchInput = ({ address, handleChange, handleSelect }) => {
  const onPressResult = address => {
    geocodeByAddress(address).then(results => handleSelect(results[0]));
    // .then(results => getLatLng(results[0]))
    // .then(latLng => handleSelect(latLng))
    // .catch(error => console.error("Error", error));
  };

  const searchOptions = {
    types: ["(regions)"]
  };

  return (
    <div style={{ position: "absolute", top: 20, left: 375 }}>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={onPressResult}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
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
    </div>
  );
};

export default LocationSearchInput;
