import React, { useState, useEffect } from "react";
import { Header, CheckSession } from "../../components";
import LogoutUser from "../Users/LogoutUser";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  return (
    <div>
      <Header />
      <LogoutUser onClick={onclick} />
      <h1>Banaan</h1>
    </div>
  );
};
