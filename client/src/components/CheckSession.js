import React from "react";
import jwt from "jsonwebtoken";

export default () => {
  const token = localStorage.getItem("auth_token");

  try {
    const verified = jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET);
    console.log("Auth passed :)");
    console.log(verified);

    return null;
  } catch (error) {
    console.log("Session expired. Please login");
    console.log(error);
    window.location = "/expired";
    return null;
  }
};
