import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckSession } from "../../components";

export default ({ match }) => {
  CheckSession(localStorage.getItem("jwt"));
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>{data?.title} </h1>
      <img src={data?.image} alt="" />
    </div>
  );
};
