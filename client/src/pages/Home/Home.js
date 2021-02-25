import React, { useState, useEffect } from "react";
import { Header, CheckSession } from "../../components";
import LogoutUser from "../Users/LogoutUser";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  const user = JSON.parse(localStorage.getItem("user")).username;

  return (
    <div>
      <Header />
      <LogoutUser onClick={onclick} />
      <h1>Welcome {user} </h1>
    </div>
  );
};
