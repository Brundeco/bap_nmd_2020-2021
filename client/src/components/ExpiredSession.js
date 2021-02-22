import React from "react";

export default () => {
  const handleClick = () => {
    window.location = "/login";
  };

  return (
    <div className="session-fullpage">
      <h2>Sorry your session has expired. Please sign in again.</h2>
      <br/>
      <button onClick={handleClick}>To login page</button>
    </div>
  );
};
