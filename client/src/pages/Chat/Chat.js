import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios";
import { Textarea } from "../../components";

let socket;

export default ({ match }) => {
  const [data, setData] = useState();
  const sender = JSON.parse(localStorage.getItem("user"));
  const recepient = match.params;

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const postMessage = () => {
    axios
      .post("http://localhost:5000/messages", {
        message: data.message,
        from: sender.id,
        fromName: sender.username,
        to: recepient.author_id,
        toName: recepient.author,
        // conversationId: sender.id + recepient.author_id,
        // conversationNameStr:
        //   sender.username.toLowerCase() + recepient.author.toLowerCase().trim(),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // const [author, setAuthor] = useState();
  // const [author_id, setAuthor_id] = useState();
  // const ENDPOINT = "http://localhost:5000";

  // useEffect(() => {
  //   const { author, author_id } = match.params;

  //   socket = io(ENDPOINT);

  //   setAuthor(author);
  //   setAuthor_id(author_id);

  //   socket.emit("join", { author, author_id });

  //   return () => {
  //     socket.emit("disconnect");

  //     socket.off();
  //   };
  // }, [ENDPOINT, match.params]);

  return (
    <div>
      <h1>Chat</h1>
      <Textarea
        name="message"
        onChange={handleChange}
        placeholder="Message"
        type="textarea"
      />
      {/* <Link to={{pathname: `/messages/602fc3b5c5e21edf10c3039e/6030156a280a2dfd10823c1c`}}>
        <li>GET MESSAGES</li>
      </Link> */}
      <button onClick={() => postMessage()}>Send</button>
    </div>
  );
};
