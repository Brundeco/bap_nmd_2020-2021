import React, { useState, useEffect } from "react";

import { Favorites, Chat, New } from "./../../pages";

export default () => {
  const [currentComponent, setCurrentComponent] = useState("favorites");

  const handleClick = (component) => {
    setCurrentComponent(component);
    console.log(currentComponent);
  };

  return (
    <div>
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
          <Chat />
        ) : (
          <New />
        )}
      </div>
    </div>
  );
};
