import React, { useState, useEffect } from "react";
import { InputField } from "../../components";
import axios from "axios";

export default () => {
  const [data, setData] = React.useState({});
  const [status, setStatus] = useState();

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setStatus(res.data.message)
        window.location = "/";
      })
      .catch((err) => setStatus(err.response.data.message));
  };

  return (
    <div>
      <h1>Login</h1>
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
        <h5> {status} </h5>
      </form>
    </div>
  );
};
