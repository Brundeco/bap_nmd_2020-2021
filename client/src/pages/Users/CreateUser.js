import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";

export default () => {
  const [data, setData] = React.useState({});
  const [status, setStatus] = useState('Status');

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/register", data)
      .then((res) => console.log(res))
      .catch((err) => setStatus(err.response.data.message));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <InputField
        name="username"
        placeholder="Username"
        type="text"
        onChange={handleChange}
      />
      <InputField
        name="phone"
        placeholder="Phone"
        type="text"
        onChange={handleChange}
      />
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
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setData({ ...data, image: base64 })}
      />
      <div>
        <img src={data?.image} alt="" />
      </div>
      <input type="submit" value="Submit" />
      <h5> {status} </h5>
    </form>
  );
};
