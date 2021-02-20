import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export default () => {
  const [data, setData] = useState();

  const token = localStorage.getItem("auth_token");
  console.log(token);

  try {
    const verified = jwt.verify(token, "&W*tw3eqWUm*sm6");
    console.log(verified);
  } catch (error) {
    console.log(error)
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
