import React from "react";

const Display = ({mainValue, secondaryValue}) => {
  return (
    <div className="Display" data-testid="Display">
      <span className="main-value" data-testid="Display__value">{mainValue}</span>
      <span className="secondary-value">{secondaryValue}</span>
    </div>
  );
};

export default Display;
