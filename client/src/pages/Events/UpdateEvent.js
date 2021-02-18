import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "./../../components";
import FileBase from "react-file-base64";
import axios from "axios";

export default ({ match }) => {
  const [data, setData] = useState();

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  const updateEvent = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/events/${match.params.id}`, data)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={updateEvent}>
      <InputField
        name="title"
        placeholder="Title"
        type="text"
        onChange={handleChange}
        value={data?.title}
      />
      <Textarea
        name="description"
        placeholder="Description"
        type="textarea"
        onChange={handleChange}
        value={data?.description}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setData({ ...data, image: base64 })}
      />
      <img src={data?.image} alt="" />
      <input type="submit" value="Submit" />
    </form>
  );
};
