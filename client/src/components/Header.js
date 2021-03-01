import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrevPage } from ".";

export default () => {
  const userImage = JSON.parse(localStorage.getItem("user")).image;
  return (
    <header className="header">
      <PrevPage />
      <div className="user-img">
        <Link
          className="link-to-dashboard"
          to={{ pathname: "/dashboard", state: { from: "root" } }}
        >
          <img src={userImage} alt="" />
        </Link>
      </div>
    </header>
  );
};
