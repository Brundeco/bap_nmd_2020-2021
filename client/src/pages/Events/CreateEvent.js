import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";

export default () => {
  const [data, setData] = React.useState({});

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/events", data);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <InputField
        name="title"
        placeholder="Title"
        type="text"
        onChange={handleChange}
      />
      <Textarea
        name="description"
        placeholder="Description"
        type="textarea"
        onChange={handleChange}
      />
      <InputField
        name="street"
        onChange={handleChange}
        placeholder="Street name"
        type="text"
      />
      <InputField
        name="houseNumber"
        onChange={handleChange}
        placeholder="Huisnummer"
        type="number"
      />
      <InputField
        name="zip"
        onChange={handleChange}
        placeholder="Postcode"
        type="number"
      />
      <InputField
        name="city"
        onChange={handleChange}
        placeholder="Stad of gemeente"
        type="text"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setData({ ...data, image: base64 })}
      />
      <div>
        <img src={data?.image} alt="" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};
