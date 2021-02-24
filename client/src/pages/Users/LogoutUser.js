import React from "react";

export default () => {
  const logout = () => {
    window.location = '/login'
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem("dashboard");
  };

  return <button onClick={logout}>Logout</button>;
};
