import React, { useState, useEffect } from "react";
import { InputField } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";
import TextLogo from "./../../icons/text_logo.svg";
import SelectImage from "./../../icons/selectimage.svg";

export default () => {
  const [data, setData] = React.useState({});
  const [status, setStatus] = useState();

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.passwordRepeat)
      setStatus("Passwords do not match");
    else {
      axios
        .post("http://localhost:5000/users/register", data)
        .then((res) => {
          setStatus(res.data.message);
          window.location = "/login?email=" + res.data.user.email;
        })
        .catch((err) => setStatus(err.response.data.message));
    }
  };

  return (
    <div className="login-screen">
      <div className="wrapper">
        <img src={TextLogo} alt="Suitswap logo" className="logo" />
        <form action="" onSubmit={handleSubmit}>
          <div>
            <img
              src={data?.image}
              className={data?.image ? "userphoto-register" : ""}
              alt=""
            />
          </div>
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
          <InputField
            name="passwordRepeat"
            placeholder="Repeat password"
            type="password"
            onChange={handleChange}
            required
          />
          <div className="file-upload-cta">
            <FileBase
              className="hide-std-file-btn"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setData({ ...data, image: base64 })}
            />
            <button id="show-custom-file-btn">
              <img src={SelectImage} alt="" />
              <span>
                {data?.image ? "Replace picture" : "Choose your profile image"}
              </span>
            </button>
          </div>
          <input
            className="main-btn register-btn"
            type="submit"
            value="Register"
          />
        </form>
        <button onClick={() => (window.location = "/login")}>
          Already a member? / Login here
        </button>
        <h5> {status} </h5>
      </div>
    </div>
  );
};
