/** @format */

import React from "react";
import "../components/main.css";

function RoundedImageComp(props) {
  return (
    <div>
      <img
        className="RoundedImageStyle"
        src={props.image}
        alt={"Personal Image"}
        width="200"
        height="200"
        style={{ borderRadius: "50%", borderStyle: "thick" }}
      />
    </div>
  );
}
export default RoundedImageComp;
