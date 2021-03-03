import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  // const [setArrayFormatted, arrayFormatted] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${user.id}`)
      .then((res) => setMessages(res.data))
      .then((res) => console.log(res))
      .catch(console.log("NO DATA"));
  }, []);

  const filterConverstaions = () => {
    console.log("filter converstaions");

    axios
      .get(`http://localhost:5000/messages/filter/${user.id}`)
      .then((res) => console.log(res.data))
      .catch(console.log("NO DATA"));
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <h1>Conversations</h1>
      <br />
      <h2>Current user {user?.username}</h2>
      <br />
    </div>
  );
};
