import React, { useState, useEffect } from "react";
import LogoutUser from "../Users/LogoutUser";
import CheckSession from "./../../components/CheckSession";

export default () => {
  return (
    <div>
      <CheckSession />
      <LogoutUser onClick={onclick} />
      <h1>Banaan</h1>
    </div>
  );
};
