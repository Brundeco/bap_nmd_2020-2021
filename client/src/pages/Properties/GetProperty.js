import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Preloader, PrevPage, ConvertDate } from "../../components";
import ImageSlider from "../../components/ImageSlider";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { app } from "../../base";

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [propertyCreatedAt, setPropertyCreatedAt] = useState();
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dates, setDates] = useState([]);
  const storageRef = app.storage();
  const [booking, setBooking] = useState({
    client: user.username,
    client_id: user.id,
  });
  const handleIndex = () => {};

  useEffect(() => {
    console.log(booking);
  }, [booking]);

  const isDayDisabled = (day) => {
    return !availableDates.some((disabledDay) =>
      DateUtils.isSameDay(day, disabledDay)
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    let tmpImgs = [];
    let tmpDates = [];
    data?.images?.map((item) => {
      tmpImgs.push({ image: item });
      setImages(tmpImgs);
    });
    data?.dates?.map((item) => {
      tmpDates.push(new Date(item));
      setAvailableDates(tmpDates);
    });
    setBooking((prev) => ({
      ...prev,
      owner_id: data?.author_id,
      owner: data?.author,
    }));
    setPropertyCreatedAt(ConvertDate(data?.createdAt));

    // const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // });
    // // console.log(longEnUSFormatter.format(data?.createdAt));
    // setPropertyCreatedAt(longEnUSFormatter.format(data?.createdAt));
  }, [data]);

  useEffect(() => {
    // console.log(propertyCreatedAt);
  }, [propertyCreatedAt]);

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    let currentDay = new Date(day).getTime();
    let newArray = [...dates];
    let indexItem = newArray.indexOf(currentDay);

    indexItem === -1
      ? newArray.push(currentDay)
      : newArray.splice(indexItem, 1);
    setDates(newArray);
  };

  useEffect(() => {
    setSelectedDates(dates?.map((date) => new Date(date)));
  }, [dates]);

  useEffect(() => {
    setBooking((prev) => ({ ...prev, dates: selectedDates }));
  }, [selectedDates]);

  const handleReservation = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/properties/book/${match.params.id}`,
        booking.dates
      )
      .then((res) => setData(res.data));
  };

  if (data != undefined) {
    return (
      <div className="property-screen">
        <div className="subject-image">
          <ImageSlider slides={images} index={handleIndex} />
        </div>
        <DayPicker
          selectedDays={selectedDates}
          onDayClick={handleDayClick}
          disabledDays={isDayDisabled}
        />

        <div className="wrapper">
          <PrevPage />
          <h1>
            {data?.street +
              " " +
              data?.houseNumber +
              ", " +
              data?.zip +
              " " +
              data?.city}
          </h1>
          <h2>
            By {data?.author} | created on {propertyCreatedAt}
          </h2>
          <p>{data?.description}</p>
          <div className="grid">
            <div className="row">
              <div className="col">
                <h3>Dayprice</h3>
                <p>€ {data?.price} </p>
              </div>
              <div className="col">
                <h3>Sq Meter</h3>
                <p>{data?.surface} m2</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Natural light</h3>
                <p>{data?.light}</p>
              </div>
              <div className="col">
                <h3>Address</h3>
                <p>
                  {data?.street + " " + data?.houseNumber + ", "} <br />
                  {data?.zip + " " + data?.city}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Available data</h3>
                <p> {data?.date} </p>
              </div>
              <div className="col">
                <h3>Contact info</h3>
                <p>
                  {data?.firstname + " " + data?.lastname} <br /> {data?.email}
                  <br />
                  {data?.phone}
                </p>
              </div>
            </div>
          </div>
          <section className="cta-section">
            <Link to={{ pathname: `/chat/${data?.author_id}/${data?.author}` }}>
              <li>Contact owner</li>
            </Link>
            <button className="main-btn" onClick={(e) => handleReservation(e)}>
              Make reservation
            </button>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Preloader text="property" />
      </React.Fragment>
    );
  }
};

// return (
//   <div className="property-list">
//     <div className="property-item">
//       <h2> {data?.title}</h2>
//       <h4> Author: {data?.author} </h4>
//       <h4> Author ID: {data?.author_id} </h4>
//       <div className="property-images">
//         {data?.images.map(function (image, i) {
//           return <img src={image} alt="" />;
//         })}
//       </div>
//       <ul>
//         <Link to={{ pathname: `/chat/${data?.author_id}/${data?.author}` }}>
//           <li>Contact owner</li>
//         </Link>
//       </ul>
//     </div>
//   </div>
// );
// };
