import React, { useState, useEffect } from "react";
import { Header } from "../../components";

import { Favorites, Chat, New, Messages } from "./../../pages";

export default () => {
  const [currentComponent, setCurrentComponent] = useState("favorites");
  const dashboardTab = localStorage.getItem("dashboard");

  useEffect(() => {
    if (dashboardTab) {
      setCurrentComponent(dashboardTab);
    }
  }, []);
  
  const handleClick = (component) => {
    console.log(component);
    localStorage.setItem("dashboard", component);
    setCurrentComponent(component);
  };

  return (
    <div>
      <Header />

      <h1>Dashboard</h1>

      <div className="buttons">
        <button
          className="class"
          onClick={(e) => handleClick(e.target.value)}
          value="favorites"
        >
          Favorites
        </button>
        <button
          className="class"
          onClick={(e) => handleClick(e.target.value)}
          value="chat"
        >
          Chat
        </button>
        <button
          className="class"
          onClick={(e) => handleClick(e.target.value)}
          value="create"
        >
          Create new
        </button>
      </div>

      <div className="comps-to-render">
        {currentComponent === "favorites" ? (
          <Favorites />
        ) : currentComponent === "chat" ? (
          <Messages />
        ) : (
          <New />
        )}
      </div>
    </div>
  );
};
