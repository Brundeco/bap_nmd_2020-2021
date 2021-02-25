import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState([]);
  // const [setArrayFormatted, arrayFormatted] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${user.id}`)
      .then((res) => setData(res))
      // .then((res) => console.log(res))
      .catch(console.log("NO DATA"));
  }, []);

  const tmpArr = [];

  //   function groupByKey(data, key) {
  //     return array
  //       .reduce((hash, obj) => {
  //         if(obj[key] === undefined) return hash;
  //         return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
  //       }, {})
  //  }

  //  groupByKey()

  useEffect(() => {
    data.data?.map((data) => {
      // console.log(data)
      tmpArr.push(data);
    });
    console.log(tmpArr);
  }, [data]);

  // useEffect(() => {
  //   console.log(arrayFormatted);
  // }, [arrayFormatted]);

  return (
    <div>
      <h1>Conversations</h1>
      <br />
      <h2>Current user {user?.username}</h2>
      <br />
    </div>
  );
};
