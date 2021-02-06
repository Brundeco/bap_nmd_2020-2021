import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
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
  );
};
