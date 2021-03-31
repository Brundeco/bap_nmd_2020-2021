import React, { useState, useEffect } from "react";
import Event1 from "./../../images/event-5.jpeg";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../../components";

export default () => {
  const [data, setData] = useState("favorites");

  return (
    <div>
      <Footer />
    </div>
  );
};
