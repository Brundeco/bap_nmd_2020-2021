import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <nav>
      <Link to="/">
        <li>Home</li>
      </Link>
    </nav>
  );
};
