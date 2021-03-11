import React, { useState, useEffect } from "react";
import { ConvertDate } from "../../components";
import axios from "axios";

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [timestamps, setTimestamps] = useState();

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${user.id}`)
      .then((res) => setMessages(res.data))
      .catch(console.log("NO DATA"));
  }, []);

  useEffect(() => {
    console.log(messages)
    let tmpTs = [];
    messages?.createdAt?.map((item) => {
      tmpTs.push({ image: item });
      setTimestamps(tmpTs);
    });
    console.log(timestamps);
  }, [messages]);

  return (
    <div>
      <h1>Conversations</h1>
      <br />
      {messages.map((item, i) => {
        return (
          <div key={i}>
            <p>{item?.message} </p> {timestamps}
            <span> {} </span>
          </div>
        );
      })}
      <br />
    </div>
  );
};
