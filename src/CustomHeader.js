import React from "react";

import { PanelHeaderFactory } from "kepler.gl/components";

const CustomTitle = () => (
  <div
    style={{
      fontSize: "24px",
      fontWeight: "500",
      // padding: "8px",
      // paddingLeft: "16px",
      color: "#1CBAD6"
    }}
  >
    hubble
  </div>
);

const CustomHeaderFactory = PanelHeaderFactory();
const CustomHeader = props => <CustomHeaderFactory {...props} logoComponent={CustomTitle} />;

export default CustomHeader;
// export default CustomTitle;
