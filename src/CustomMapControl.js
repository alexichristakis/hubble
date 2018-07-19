import React from "react";

import { toggleFullScreen, forwardTo } from "kepler.gl/actions";
import { connect } from "react-redux";

const CustomMapControl = props => {
  console.log(props);
  // props.onToggleFullScreen();
  return (
    <div>
      <div onClick={e => props.onTogglePerspective()}>toggle full screen</div>
      <div onClick={e => props.onToggleMapControl("mapLegend")}>toggle legend</div>
    </div>
  );
};

export default CustomMapControl;