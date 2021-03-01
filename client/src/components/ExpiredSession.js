import React from "react";
import NoGeolocation from "./../icons/no-geolocation.svg";

export default () => {
  const handleClick = () => {
    window.location = "/login";
  };

  return (
    <div className="session-page">
      <img src={NoGeolocation} alt=""/>
      <h1>Sorry your session has expired. Please sign in again.</h1>
      <button className="main-btn" onClick={handleClick}>To login page</button>
    </div>
  );
};
