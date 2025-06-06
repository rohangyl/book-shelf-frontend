import * as React from "react";
const SVGComponent = (props) => (
  <svg
    fill="#000000"
    width="15px"
    height="15px"
    viewBox="0 0 1.5 1.5"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.355 1.27 1.125 1.04a0.565 0.565 0 1 0 -0.085 0.085l0.23 0.23a0.065 0.065 0 0 0 0.09 0 0.065 0.065 0 0 0 0 -0.085M0.69 1.125A0.44 0.44 0 1 1 1.13 0.685a0.45 0.45 0 0 1 -0.44 0.44" />
  </svg>
);
export default SVGComponent;
