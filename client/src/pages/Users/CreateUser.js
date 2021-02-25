import React, { useState, useEffect } from "react";
import { InputField } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";
import TextLogo from "./../../icons/text_logo.svg";

export default () => {
  const [data, setData] = React.useState({});
  const [status, setStatus] = useState();

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/register", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setStatus(res.data.message);
      })
      .catch((err) => setStatus(err.response.data.message));
  };

  return (
    <div className="login-screen">
      <div className="wrapper">
      <img src={TextLogo} alt="Suitswap logo" />
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            required
          />
          <InputField
            name="phone"
            placeholder="Phone"
            type="text"
            onChange={handleChange}
            required
          />
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
          <InputField
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            required
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setData({ ...data, image: base64 })}
          />
          <div>
            <img src={data?.image} alt="" />
          </div>
          <input className="main-btn" type="submit" value="Register" />
        </form>
        <button onClick={() => (window.location = "/login")}>
          Already a member? / Login here
        </button>
        <h5> {status} </h5>
      </div>
    </div>
  );
};
