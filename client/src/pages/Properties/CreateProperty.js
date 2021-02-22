import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";

export default () => {
  const [data, setData] = React.useState({});
  const [images, setImages] = useState([]);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/properties", {
      title: data.title,
      images: images,
    });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <InputField
        name="title"
        placeholder="Title"
        type="text"
        onChange={handleChange}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImages(() => [...images, base64])}
      />
      {images?.map(function (item, i) {
        return (
          <section key={i}>
            <img src={item} alt="" />
            <button>Delete</button>
          </section>
        );
      })}
      <input type="submit" value="Submit" />
    </form>
  );
};
