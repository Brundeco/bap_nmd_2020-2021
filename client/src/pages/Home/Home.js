import React, { useState, useEffect } from "react";
import { Header, CheckSession, LocateUser } from "../../components";
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
  const [titles, setTitles] = useState();
  const [evtIndex, setEvtIndex] = useState(0);

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
    // let tmpIndex = [];
    data?.map((item, i) => {
      // tmpIndex.push(i);
      tmpTitles.push({ title: item.title });
      tmpImgs.push({ image: item.image });
      setImages(tmpImgs);
      setTitles(tmpTitles);
      // setEvtIndex(tmpIndex);
    });
    // console.log(data?.length);
  }, [data]);

  const prevEvent = () => {
    if (evtIndex > 0) setEvtIndex(evtIndex - 1);
  };

  const nextEvent = () => {
    if (evtIndex < data?.length - 1) setEvtIndex(evtIndex + 1);
  };

  return (
    <div>
      <Header />
      <LocateUser coords={handleCoords} err={setError} />
      {error ? <NoLocation /> : ""}
      <div className="home-screen">
        <section className="event-section">
          <h2>Events around you</h2>
          <div className="event-list">
            <div className="event-featured">
              <img src={images?.[evtIndex]?.image} alt="" />
              <p className="event-title">{titles?.[evtIndex]?.title}</p>
              <button onClick={prevEvent} className="evt-prev-btn">
                <FontAwesome icon={faChevronLeft} />
              </button>
            </div>
            <div className="event-next">
              <img src={images?.[evtIndex + 1]?.image} />
              <button onClick={nextEvent} className="evt-next-btn">
                <FontAwesome icon={faChevronRight} />
              </button>
            </div>
          </div>
        </section>
        <button
          className="main-btn"
          onClick={() => (window.location = "/events")}
        >
          Show all events
        </button>
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
