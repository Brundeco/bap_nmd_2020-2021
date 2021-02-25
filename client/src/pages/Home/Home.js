import React, { useState, useEffect } from "react";
import { Header, CheckSession } from "../../components";
import Event1 from "./../../images/event-5.jpeg";
import Event2 from "./../../images/event-4.jpg";
import ImageSlider from './../../components/ImageSlider';
import { SliderData } from "./../../components/SliderData";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  const user = JSON.parse(localStorage.getItem("user")).username;

  console.log(SliderData);

  return (
    <div>
      {/* <Header />
      <div className="home-screen">
        <div className="wrapper">
          
          <section className="event-section">
            <h2>Events around you</h2>
            <div className="event-list">
              <div className="event-card">
                <div className="event-image">
                  <img src={Event1} alt="Event 1" />
                </div>
                <p className="event-title">Moderat invites friends</p>
              </div>

              <div className="event-card">
                <div className="event-image">
                  <img src={Event2} alt="Event 2" />
                </div>
                <p className="event-title">Vintage clothing</p>
              </div>
            </div>
          </section>
        </div>
      </div> */}

      <ImageSlider slides={SliderData} />
    </div>
  );
};
