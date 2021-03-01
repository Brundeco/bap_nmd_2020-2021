import React, { useState, useEffect } from "react";
import Event1 from "./../../images/event-5.jpeg";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../../components";

export default () => {
  const [data, setData] = useState("favorites");

  return (
    <div>
      <div>
        <div className="main-list-item">
          <div className="list-part">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="list-part">
            <img src={Event1} alt="" />
          </div>
          <div className="list-part">
            <h3>Moderat meets friends</h3>
            <p>16 feb 2021 | 9000 Gent</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
