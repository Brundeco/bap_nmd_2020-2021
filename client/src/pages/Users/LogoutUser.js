import React from "react";
import LogoutIcon from "./../../icons/logout.svg";

export default () => {
  const logout = () => {
    window.location = "/login";
    localStorage.clear();
  };

  return (
    <button onClick={logout}>
      <img src={LogoutIcon} />
    </button>
  );
};
