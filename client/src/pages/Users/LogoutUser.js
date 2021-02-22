import React from "react";

export default () => {
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location = '/login'
  };

  return <button onClick={logout}>Logout</button>;
};
