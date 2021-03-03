import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "../../components";
import SelectImage from "./../../icons/selectimage.svg";
import FileBase from "react-file-base64";

export default (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
  });

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <h1>Fill out the form below to create your event</h1>
      <form onSubmit={props.onSubmit} formdata={props.formdata(data)}>
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
              <img src={SelectImage} alt="" />
              <span>
                {data?.image ? "Replace picture" : "Event wallpaper"}{" "}
              </span>
            </button>
          </div>
          <div>
            <img
              src={data?.image}
              className={data?.image ? "wallphoto" : ""}
              alt={data?.image ? "Event wallphoto" : ""}
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
              <div className="form-row">
                <div className="form-col-md">
                  <InputField
                    name="startHrs"
                    onChange={handleChange}
                    placeholder="13"
                    type="number"
                    className="main-input-field"
                  />
                </div>
                <div className="form-col-md">
                  <InputField
                    name="startMins"
                    onChange={handleChange}
                    placeholder="00"
                    type="number"
                    className="main-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="form-col-md">
              <p className="form-hour-field">Start hour</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-md">
              <div className="form-row">
                <div className="form-col-md">
                  <InputField
                    name="endHrs"
                    onChange={handleChange}
                    placeholder="20"
                    type="number"
                    className="main-input-field"
                  />
                </div>
                <div className="form-col-md">
                  <InputField
                    name="endMins"
                    onChange={handleChange}
                    placeholder="30"
                    type="number"
                    className="main-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="form-col-md">
              <p className="form-hour-field">End hour</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-lmd">
              <InputField
                name="price"
                placeholder="Price"
                type="number"
                onChange={handleChange}
                className="main-input-field"
              />
            </div>
            <div className="form-col-md">
              <p className="form-hour-field">Price in Eur</p>
            </div>
          </div>
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
    </React.Fragment>
  );
};
