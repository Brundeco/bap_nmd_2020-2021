import React, { useState, useEffect } from "react";
import {
  InputField,
  Textarea,
  Preloader,
  CheckSession,
  PrevPage,
} from "./../../components";
import SelectImage from "./../../icons/selectimage.svg";
import FileBase from "react-file-base64";
import axios from "axios";

export default () => {
  CheckSession(localStorage.getItem("jwt"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
  });

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/events", data);
  };

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <h1>Fill out the data below to create your event</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <h2>Event image</h2>
            <div className="file-upload-cta">
              <FileBase
                className="hide-std-file-btn"
                type="file"
                multiple={false}
                onDone={({ base64 }) => setData({ ...data, image: base64 })}
              />
              <button id="show-custom-file-btn">
                <img src={SelectImage} alt=""/>
                <span>
                  {data?.image ? "Replace picture" : "Event wallpaper"}{" "}
                </span>
              </button>
            </div>
            <div>
              <img
                src={data?.image}
                className={data?.image ? "wallphoto" : ""}
                alt={data?.image ? "Profile image" : ""}
              />
            </div>
          </section>
          <section>
            <h2>General information</h2>
            <InputField
              name="title"
              placeholder="Title"
              type="text"
              onChange={handleChange}
              className="main-input-field"
            />
            <Textarea
              name="description"
              placeholder="Description"
              type="textarea"
              onChange={handleChange}
              className="main-input-field"
            />
            <InputField
              name="date"
              placeholder="Datepicker"
              type="number"
              onChange={handleChange}
              className="main-input-field"
            />
            <div className="form-row">
              <div className="form-col-md">
                <InputField
                  name="startHour"
                  onChange={handleChange}
                  placeholder="Start hour"
                  type="number"
                  className="main-input-field"
                />
              </div>
              <div className="form-col-md">
                <InputField
                  name="endHour"
                  onChange={handleChange}
                  placeholder="End hour"
                  type="number"
                  className="main-input-field"
                />
              </div>
            </div>
            <InputField
              name="price"
              placeholder="Price"
              type="number"
              onChange={handleChange}
              className="main-input-field"
            />
          </section>

          <section>
            <h2>Address</h2>
            <div className="form-row">
              <div className="form-col-lg">
                <InputField
                  name="street"
                  onChange={handleChange}
                  placeholder="Street"
                  type="text"
                  className="main-input-field"
                />
              </div>
              <div className="form-col-sm">
                <InputField
                  name="number"
                  onChange={handleChange}
                  placeholder="No"
                  type="number"
                  className="main-input-field"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col-sm">
                <InputField
                  name="zip"
                  onChange={handleChange}
                  placeholder="Zip"
                  type="number"
                  className="main-input-field"
                />
              </div>
              <div className="form-col-lg">
                <InputField
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  type="text"
                  className="main-input-field"
                />
              </div>
            </div>
          </section>

          <input type="submit" value="Submit" className="main-input-field" />
        </form>
      </div>
    </div>
  );
};
