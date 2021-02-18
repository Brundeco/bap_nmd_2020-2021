import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Preloader } from "../components";

export default () => {
  const [data, setData] = useState();
  const [showLayer, setShowLayer] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const toggleLayer = () => {
    showLayer ? setShowLayer(false) : setShowLayer(true);
  };

  if (data != undefined) {
    return (
      <React.Fragment>
        {toggleLayer}
        <div className={showLayer ? "show-bg-layer" : "hide-bg-layer"}>
          {data?.map(function (item, i) {
            return (
              <div key={i}>
                <h2> {item.title} </h2>
                <p> {item.description} </p>
                <img src={item.image} alt="" />
                <Link to={{ pathname: `/event/${item._id}` }}>
                  <li>DETAIL</li>
                </Link>
                <Link to={{ pathname: `/update-event/${item._id}` }}>
                  <li>UPDATE</li>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className={showLayer ? "show-bg-layer" : "hide-bg-layer"}>
        <Preloader text="Events are loading" />
        {toggleLayer}
      </div>
    );
  }
};
