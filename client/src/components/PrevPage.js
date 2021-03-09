import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { FontAwesome } from ".";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "./../icons/search.svg";
import RadiusIcon from "./../icons/radius.svg";

export default () => {
  const location = useLocation();
  const history = useHistory();
  let currentPath = location.pathname;

  const handleClick = () => {
    if (history.location.pathname.includes("login")) return;
    history.goBack();
  };

  if (currentPath === "/")
    return (
      <div className="menu-actions-homepage">
        <div className="search">
          <img src={SearchIcon} />
        </div>
        <div className="radius">
          <img src={RadiusIcon} />
        </div>
      </div>
    );

  return (
    <div className="prev-page-component" onClick={handleClick}>
      <FontAwesome icon={faChevronLeft} />
    </div>
  );
};
