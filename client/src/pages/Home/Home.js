import React, { useState, useEffect } from "react";

export default () => {
  const [data, setData] = useState();

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
