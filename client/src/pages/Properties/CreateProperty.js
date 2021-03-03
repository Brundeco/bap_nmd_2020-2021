import React, { useState, useEffect } from "react";
import { CheckSession, PrevPage } from "./../../components";
import axios from "axios";
import { PropertyForm } from "..";

export default (props) => {
  CheckSession(localStorage.getItem("jwt"));

  const [data, setData] = React.useState();
  
  const handleData = (formData) => {
    setData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    // axios.post("http://localhost:5000/properties", {
    //   title: data.title,
    //   author_id: data.author_id,
    //   author: data.author,
    //   images: images,
    // });
  };

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <PropertyForm onSubmit={handleSubmit} formdata={handleData} />
      </div>
    </div>
  );
};
