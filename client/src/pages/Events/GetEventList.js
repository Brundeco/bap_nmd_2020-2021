import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Preloader, CheckSession } from "./../../components";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setData(res.data.events);
        console.log(res.data.user);
      })
      .catch((err) => {
        err.response.status === 401
          ? console.log(err.response.data.message)
          : console.log(err);
      });
  }, []);

  if (data != undefined) {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Preloader text="Events are loading" />
      </React.Fragment>
    );
  }
};
