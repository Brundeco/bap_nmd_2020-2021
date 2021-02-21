import React from "react";

export default () => {
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    window.location = '/login'
  };

  return <button onClick={logout}>Logout</button>;
};
