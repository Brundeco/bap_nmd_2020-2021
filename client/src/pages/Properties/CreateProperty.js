import React, { useState, useEffect } from "react";
import {
  InputField,
  CheckSession,
  Textarea,
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
  const [images, setImages] = useState([]);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images);
    axios.post("http://localhost:5000/properties", {
      title: data.title,
      author_id: data.author_id,
      author: data.author,
      images: images,
    });
  };

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <h1>Fill out the data below to start hosting your property</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <h2>General information</h2>
            <Textarea
              name="description"
              placeholder="Description about your place"
              type="textarea"
              onChange={handleChange}
              className="main-input-field"
            />
            <div className="form-row">
              <div className="form-col-md">
                <InputField
                  name="price"
                  placeholder="Price"
                  type="number"
                  onChange={handleChange}
                  className="main-input-field"
                />
              </div>
              <div className="form-col-md">
                <InputField
                  name="surface"
                  onChange={handleChange}
                  placeholder="Square meters"
                  type="number"
                  className="main-input-field"
                />
              </div>
            </div>
            <InputField
              name="light"
              placeholder="Natural light"
              type="text"
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

          <section>
            <h2>Contact info</h2>
            <InputField
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              required
            />
            <InputField
              name="phone"
              placeholder="Phone"
              type="number"
              onChange={handleChange}
              required
            />
            <InputField
              name="firstname"
              placeholder="Firstname"
              type="text"
              onChange={handleChange}
              required
            />
            <InputField
              name="lastname"
              placeholder="Lastname"
              type="text"
              onChange={handleChange}
              required
            />
          </section>

          <section>
            <h2>Images</h2>

            <div className="file-upload-cta fit">
              <FileBase
                className="hide-std-file-btn"
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImages(() => [...images, base64])}
              />
              <button id="show-custom-file-btn">
                <img src={SelectImage} alt="" />
                <span>
                  {data?.image ? "Replace picture" : "Event wallpaper"}{" "}
                </span>
              </button>
            </div>
            <div className="img-gallery">
              {images?.map(function (item, i) {
                return (
                  <React.Fragment>
                    <div className="img-box">
                      <img src={item} alt="" />
                      <button>Delete</button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          <input type="submit" value="Verify info" className="main-input-field" />
        </form>
      </div>
    </div>
  );
};
