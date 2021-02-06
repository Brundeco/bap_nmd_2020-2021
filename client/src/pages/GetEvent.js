import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/events/601e7c4a6d4ade02b68e8a18")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>{ data?.title } </h1>
      <img src={data?.image} alt="" />
    </div>
  );
};
