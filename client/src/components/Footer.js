import React from "react";
import { DeleteUser } from ".";
import { LogoutUser } from "../pages";

export default () => {
  return (
    <footer>
      <LogoutUser onClick={onclick} />
      <DeleteUser onClick={onclick} />
    </footer>
  );
};
