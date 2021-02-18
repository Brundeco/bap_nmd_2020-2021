import React from "react";

export default ({text}) => {

  return (
    <React.Fragment>
      <div className="content">
        <div className="loading">
          <p>{text}</p>
          <span></span>
        </div>
      </div>
    </React.Fragment>
  );
};
