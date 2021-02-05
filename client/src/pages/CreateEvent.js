import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "../components";

export default () => {
  const [data, setData] = React.useState({});

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(data);

  return (
    <form action="">
      <InputField
        name="title"
        placeholder="Title"
        type="text"
        onChange={handleChange}
      />
      <Textarea
        name="description"
        placeholder="Description"
        type="textarea"
        onChange={handleChange}
      />
    </form>
  );
};
