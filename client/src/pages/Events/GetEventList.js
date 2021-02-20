import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Preloader } from "./../../components";

export default () => {
  const [data, setData] = useState();
  const jwt = localStorage.getItem("auth_token");
  const user = JSON.parse(localStorage.getItem("user")).id;
  console.log(user)

  useEffect(() => {
    axios
      .get("http://localhost:5000/events", {
        headers: {
          auth_token: jwt
        },
      })
      .then((res) => {
        setData(res.data.events);
        console.log(res.data.user);
      })
      .catch((err) => {
        err.response.status === 401
          ? (window.location = "/login")
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
