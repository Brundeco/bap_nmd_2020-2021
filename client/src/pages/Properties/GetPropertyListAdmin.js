import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Header, Preloader } from "../../components";

export default () => {
  const user = JSON.parse(localStorage.getItem("user")).id;
  const [data, setData] = useState();

  const userId = user;
  useEffect(() => {
    axios
      .post("http://localhost:5000/properties/admin", { id: userId })
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="properties-admin-screen page-wrapper">
          <h1>Admins properties</h1>
          {data?.map((item) => {
            return (
              <div className="main-list-item">
                <div className="list-part">
                  <button
                    onClick={() =>
                      (window.location = "update-property/" + item._id)
                    }
                  >
                    Update
                  </button>
                </div>
                <div className="list-part">
                  <img src={item.images[0]} alt="" />
                </div>
                <div className="list-part">
                  <h3> {item?.zip + ", " + item?.city} </h3>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  } else {
    return <Preloader text="Loading your properties" />;
  }
};
