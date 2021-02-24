import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem("user")).id;

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/chat/${user}`
      )
      // .then((res) => setData(res.data.messages))
      .then((res) => console.log(res))
      .catch(console.log("NO DATA"));
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div>
      <h1>Messages</h1>
    </div>
  );
};
