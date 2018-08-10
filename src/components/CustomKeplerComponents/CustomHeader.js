import React from "react";

import { PanelHeaderFactory } from "kepler.gl/components";
import icon from "../../assets/logo.png";

const CustomTitle = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row"
    }}
  >
    <img style={{ width: 20, height: 30, marginRight: 8, marginTop: 11 }} src={icon} />
    <div
      style={{
        fontSize: "30px",
        fontWeight: "500",
        color: "#1CBAD6"
      }}
    >
      hubble
    </div>
  </div>
);

const CustomHeaderFactory = PanelHeaderFactory();
const CustomHeader = props => <CustomHeaderFactory {...props} logoComponent={CustomTitle} />;

export default CustomHeader;
