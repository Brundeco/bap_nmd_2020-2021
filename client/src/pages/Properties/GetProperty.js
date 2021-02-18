import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/properties/601ea34b58d8a1e1aab754dd")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>{data?.title} </h1>
      <section>
        {data?.images.map(function (item, i) {
          return <img key={i} src={item} alt="" />;
        })}
      </section>
    </div>
  );
};
