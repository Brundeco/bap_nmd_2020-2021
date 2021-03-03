import React, { useState, useEffect } from "react";
import { CheckSession, PrevPage } from "./../../components";
import axios from "axios";
import { EventForm } from "..";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  const [data, setData] = React.useState();

  const handleData = (formData) => {
    setData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:5000/events", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <EventForm onSubmit={handleSubmit} formdata={handleData} />
      </div>
    </div>
  );
};
