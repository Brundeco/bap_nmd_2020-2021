import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeImage from "./../../icons/heart-full.svg";
import { Preloader, CheckSession, PrevPage } from "./../../components";
import { Date } from "prismic-reactjs";

export default ({ match }) => {
  CheckSession(localStorage.getItem("jwt"));
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    const timestamp = data?.createdAt;

    if (timestamp) {
      console.log(timestamp.toString());

      // const timestampToString = Date(timestamp).toString()
      // console.log(timestampToString)
    }
  }, [data]);

  if (data != undefined) {
    return (
      <div>
        <div className="event-screen">
          <div className="subject-image">
            <img src={data?.image} alt="" />
          </div>
          <div className="wrapper">
            <PrevPage />
            <h1>{data?.title}</h1>
            <h2>By Leda Lenskens | created on 16 feb, 2021</h2>
            <p> {data?.description}</p>
            <div>
              <h3>Practical</h3>
            </div>
            <section className="cta-section">
              <button className="main-btn">
                <img src={LikeImage} alt="" />
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Preloader />
      </React.Fragment>
    );
  }
};
