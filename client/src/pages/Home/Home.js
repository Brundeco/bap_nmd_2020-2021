import React, { useState, useEffect } from "react";
import { Header, CheckSession, LocateUser } from "../../components";
import Event1 from "./../../images/event-5.jpeg";
import Event2 from "./../../images/event-4.jpg";
import Event3 from "./../../images/event-2.jpg";
import Event4 from "./../../images/event-3.jpg";
import { FontAwesome } from "./../../components";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NoLocation } from "..";
import ImageSlider from "../../components/ImageSlider";
import axios from "axios";

export default () => {
  CheckSession(localStorage.getItem("jwt"));
  const [data, setData] = useState();
  const [coords, setCoords] = useState();
  const [error, setError] = useState();
  const [images, setImages] = useState([]);

  const handleCoords = (coords) => {
    setCoords(coords);
  };

  useEffect(() => {
    // console.log(coords);
    if (coords != undefined) {
      localStorage.setItem("userLat", coords?.coordinates?.lat);
      localStorage.setItem("userLon", coords?.coordinates?.lng);
    }
  }, [coords]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setData(res.data.events);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log(data);
    let tmpArr = [];
    data?.map((item, i) => {
      // console.log(item)
      tmpArr.push({ image: item.image });
      setImages(tmpArr);
    });
  }, [data]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div>
      <Header />
      <LocateUser coords={handleCoords} err={setError} />
      {error ? <NoLocation /> : ""}

      <div className="home-screen page-wrapper">
        <div className="wrapper">
          <section className="event-section">
            <h2>Events around you</h2>
            <div className="event-list">
              {/* <FontAwesome icon={faChevronLeft} /> */}
              <ImageSlider slides={images} />
              {/* <FontAwesome icon={faChevronRight} /> */}
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

          {/* <section className="event-section">
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
          </section> */}

          {/* <section>
            <button
              className="main-btn"
              onClick={() => (window.location = "/properties")}
            >
              Show all properties
            </button>
          </section> */}
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
