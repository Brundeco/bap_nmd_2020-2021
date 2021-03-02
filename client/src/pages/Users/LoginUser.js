import React, { useState } from "react";
import { InputField, CheckSession } from "../../components";
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
    console.log(data)
    axios
      .post("http://localhost:5000/users/login", data)
      .then((res) => {
        setStatus(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("jwt", res.data.token);
        if (CheckSession(res.data.token)) {
          window.location = "/";
        }
      })
      .catch((err) => setStatus(err.response.data.message));
  };

  return (
    <div className="login-screen full-screen">
      <div className="wrapper">
        <img src={TextLogo} alt="Suitswap logo" className="logo" />
        <form action="" onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="main-input-field"
            required
          />
          <InputField
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            className="main-input-field"
            required
          />
          <input className="main-btn" type="submit" value="Login" />
        </form>
        <button onClick={() => (window.location = "/register")}>
          Not a member yet? / Sign up here
        </button>
        <h5> {status} </h5>
      </div>
    </div>
  );
};
