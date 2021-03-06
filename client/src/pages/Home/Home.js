import React, { useState, useEffect } from "react";
import { Header, CheckSession, LocateUser } from "../../components";
import Event1 from "./../../images/event-5.jpeg";
import Event2 from "./../../images/event-4.jpg";
import Event3 from "./../../images/event-2.jpg";
import Event4 from "./../../images/event-3.jpg";
import { FontAwesome } from "./../../components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default () => {
  CheckSession(localStorage.getItem("jwt"));
  const [coords, setCoords] = useState();

  const user = JSON.parse(localStorage.getItem("user")).username;

  const handleCoords = (coords) => {
    setCoords(coords);
  };

  useEffect(() => {
    console.log(coords);
    if (coords != undefined) {
      localStorage.setItem("userLat", coords.coordinates.lat);
      localStorage.setItem("userLon", coords.coordinates.lng);
    }
  }, [coords]);

  return (
    <div>
      <Header />
      <LocateUser coords={handleCoords} />
      <div className="home-screen page-wrapper">
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
          <section>
            <button
              className="main-btn"
              onClick={() => (window.location = "/events")}
            >
              Show all events
            </button>
          </section>

          <section className="event-section">
            <h2>Places for rent now</h2>
            <div className="event-list">
              <div className="event-card property-card">
                <div className="event-image">
                  <img src={Event4} alt="Event 1" />
                </div>
                <p className="event-title">Moderat invites friends</p>
              </div>

              <div className="event-card property-card">
                <div className="event-image">
                  <img src={Event3} alt="Event 2" />
                </div>
                <p className="event-title">Vintage clothing</p>
              </div>
            </div>
          </section>
          <section>
            <button
              className="main-btn"
              onClick={() => (window.location = "/properties")}
            >
              Show all properties
            </button>
          </section>
        </div>
        <section className="cta-section">
          <button className="main-btn">
            Host property for popup event <FontAwesome icon={faChevronRight} />
          </button>
        </section>
      </div>
      {/* <ImageSlider slides={SliderData} /> */}
    </div>
  );
};
