import React from "react";
import Icon from "./../icons/location-disabled.svg";

export default () => {
  const handleClick = () => {
    localStorage.setItem("askLocation", false);
    window.location = "/";
  };

  return (
    <div className="no-location-screen">
      <div className="wrapper">
        <h1>Location was not found</h1>
        {/* <img src={Icon} alt="Suitswap logo" /> */}
        <h1>Please enable geolocation to use full functionality</h1>
      </div>
    </div>
  );
};
