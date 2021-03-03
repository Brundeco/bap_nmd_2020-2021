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
import { PropertyForm } from "..";

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

  const handleSubmit = (data) => {
    // e.preventDefault();
    console.log(data)
    // console.log("handle submot triggered");
    // console.log(images);
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
        <h1>Fill out the data below to start hosting your property</h1>
        <PropertyForm onSubmit={(data) => handleSubmit(data) } />
      </div>
    </div>
  );
};
