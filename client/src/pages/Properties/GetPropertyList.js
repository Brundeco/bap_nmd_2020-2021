import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/properties")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="property-list">
      {data?.map(function (item, i) {
        return (
          <div key={i} className="property-item">
            <h2> {item.title}</h2>
            <div className="property-images">
              {item.images.map(function (image, i) {
                return <img src={image} alt="" />;
              })}
            </div>
            <ul>
              <Link to={{ pathname: `/property/${item._id}/${item.author_id}` }}>
                <li>DETAIL</li>
              </Link>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
