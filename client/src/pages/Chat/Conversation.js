import React, { useState, useEffect } from "react";
import { Header, CheckSession } from "../../components";

export default () => {
  CheckSession(localStorage.getItem("jwt"));

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [data, setData] = useState("favorites");
  const [name, setName] = useState();

  return (
    <div>
      <Header />
      <h1>Chat</h1>
    </div>
  );
};
