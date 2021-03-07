import React, { useState, useEffect } from "react";

export default () => {
  const [data, setData] = useState("favorites");

  return (
    <div>
      <br/>
      <h2>Add new property or event</h2>
      <br/>
      <button className="dashboard-btn-create" onClick={() => (window.location = "/create-event")}>Create event</button>
      <button className="dashboard-btn-create" onClick={() => (window.location = "/create-property")}>Create property</button>
    </div>
  );
};
