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
import { Link } from "react-router-dom";

export default () => {
  CheckSession(localStorage.getItem("jwt"));
  const [data, setData] = useState();
  const [coords, setCoords] = useState();
  const [error, setError] = useState();
  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState();
  const [ids, setIds] = useState();
  const [current, setCurrent] = useState(0);

  const handleCoords = (coords) => {
    setCoords(coords);
  };

  useEffect(() => {
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
    let tmpImgs = [];
    let tmpTitles = [];
    let tmpId = [];
    data?.map((item, i) => {
      tmpTitles.push({ title: item.title });
      tmpImgs.push({ image: item.image });
      tmpId.push({ id: item._id });
      setImages(tmpImgs);
      setTitles(tmpTitles);
      setIds(tmpId);
    });
  }, [data]);

  const handleIndex = (currentItem) => {
    setCurrent(currentItem);
  };

  return (
    <div>
      <Header />
      <LocateUser coords={handleCoords} err={setError} />
      {error ? <NoLocation /> : ""}
      <div className="home-screen page-wrapper">
        <div className="wrapper">
          <section className="event-section">
            <h2>Events around you</h2>
            <Link to={{ pathname: "/event/" + ids?.[current].id }}>
              <div className="event-list">
                <ImageSlider slides={images} index={handleIndex} />
              </div>
              <p className="event-title">{titles && titles[current].title}</p>
            </Link>
            <button
              className="main-btn"
              onClick={() => (window.location = "/events")}
            >
              Show all events
            </button>
          </section>
        </div>
      </div>

      <section className="property-section-homepage">
        <h2>Organise your next event</h2>
        <p>
          You want to organise your next event but are still looking for a host?
          You might find what you are looking for below.
        </p>
        <img src={Event4} alt="Event 1" />
        <button
          className="main-btn"
          onClick={() => (window.location = "/properties")}
        >
          Show available properties
        </button>
      </section>
      {/* <section className="cta-section">
          <button className="main-btn">
            Host property for popup event <FontAwesome icon={faChevronRight} />
          </button>
        </section> */}
    </div>
  );
};
