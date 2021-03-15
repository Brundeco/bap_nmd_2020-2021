import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "../../components";
import SelectImage from "./../../icons/selectimage.svg";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import uuid from "react-uuid";

export default (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [files, setFiles] = useState([]);
  const [dates, setDates] = useState([]);
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
    images: [],
    firebaseRef: uuid(),
  });

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
    Array.from(e.target.files).map((file) => {
      const newFile = file;
      newFile["id"] = uuid();
      setFiles((prevState) => [...prevState, newFile]);
    });
  };

  useEffect(() => {
    let tmpArr = [];
    files.forEach((element) => {
      tmpArr.push(element.id);
      setData((prev) => ({ ...prev, images: tmpArr }));
    });
  }, [files]);

  const handleDayClick = (day) => {
    let currentDay = new Date(day).getTime();
    let newArray = [...dates];
    let indexItem = newArray.indexOf(currentDay);

    indexItem === -1
      ? newArray.push(currentDay)
      : newArray.splice(indexItem, 1);
    setDates(newArray);
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      dates: dates?.map((date) => new Date(date)),
    }));
  }, [dates]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <React.Fragment>
      <h1>Fill out the form below to start hosting your property</h1>
      <DayPicker selectedDays={data.dates} onDayClick={handleDayClick} />
      <form
        onSubmit={props.onSubmit}
        formdata={props.formdata(data)}
        files={props.files(files)}
      >
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
                name="houseNumber"
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
            <input type="file" onChange={handleFiles} multiple />

            <button id="show-custom-file-btn">
              <img src={SelectImage} alt="" />
              <span>
                {data?.image ? "Replace picture" : "Property pictures"}{" "}
              </span>
            </button>
          </div>
          <div className="img-gallery">
            {files?.map(function (item, i) {
              return (
                <React.Fragment key={i}>
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
    </React.Fragment>
  );
};
