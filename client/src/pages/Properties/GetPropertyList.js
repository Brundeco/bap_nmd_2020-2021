import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Header, Preloader } from "../../components";

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

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="property-screen">
          <div className="wrapper">
            {data?.map(function (item, i) {
              return (
                <div key={i} className="list-item">
                  <h2> {item.description}</h2>
                  <div className="image">
                    <img src={item.images[0]} alt="" />
                  </div>
                  <ul>
                    <Link
                      to={{
                        pathname: `/property/${item._id}/${item.author_id}`,
                      }}
                    >
                      <li>DETAIL</li>
                    </Link>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Preloader />
      </React.Fragment>
    );
  }
};
