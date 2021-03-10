import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Header, Preloader } from "../../components";

export default () => {
  const user = JSON.parse(localStorage.getItem("user")).id;
  console.log(user + "hello");
  const [data, setData] = useState();

  const userId = user;
  useEffect(() => {
    axios
      .post("http://localhost:5000/properties/admin", { id: userId })
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <React.Fragment>
      <Header />
      <h1>Admins properties</h1>
    </React.Fragment>
  );
};
