import React from "react";
import ReactLoading from "react-loading";

const LoadingOverlay = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: "20%",
      paddingLeft: "50%",
      backgroundColor: "rgba(75,75,75,0.7)"
    }}
  >
    <ReactLoading type={"spin"} color={"#1CBAD6"} height={200} width={200} />
  </div>
);

export default LoadingOverlay;
