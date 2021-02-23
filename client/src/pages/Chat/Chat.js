import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default ({ match }) => {
  const [author, setAuthor] = useState();
  const [author_id, setAuthor_id] = useState();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { author, author_id } = match.params;

    socket = io(ENDPOINT);

    setAuthor(author);
    setAuthor_id(author_id);

    socket.emit('join', {author, author_id})

    console.log(socket);
  }, [ENDPOINT, match.params]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};
