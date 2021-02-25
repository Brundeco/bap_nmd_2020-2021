import React, { useState, useEffect } from "react";
import LogoutUser from "../Users/LogoutUser";

export default () => {
  const [data, setData] = useState("favorites");

  return (
    <div>
      <h1>Favorites </h1>
      <LogoutUser onClick={onclick} />
    </div>
  );
};
