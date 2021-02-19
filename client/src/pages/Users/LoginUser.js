import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "../../components";
// import FileBase from "react-file-base64";
import axios from "axios";

export default () => {
  const [data, setData] = React.useState({});

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <InputField
        name="email"
        placeholder="Email"
        type="text"
        onChange={handleChange}
      />
      <InputField
        name="password"
        placeholder="password"
        type="password"
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
