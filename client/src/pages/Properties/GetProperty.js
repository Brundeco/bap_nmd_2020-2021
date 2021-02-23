import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default ({ match }) => {
  console.log("Arrived at property detail page ! ! :) ! !");
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="property-list">
      <div className="property-item">
        <h2> {data?.title}</h2>
        <h4> Author: {data?.author} </h4>
        <h4> Author ID: {data?.author_id} </h4>
        <div className="property-images">
          {data?.images.map(function (image, i) {
            return <img src={image} alt="" />;
          })}
        </div>
        <ul>
          <Link to={{ pathname: `/chat/${data?.author_id}/${data?.author}` }}>
            <li>Contact owner</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
