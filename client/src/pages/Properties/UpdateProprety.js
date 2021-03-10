import React, { useState, useEffect } from "react";
import { InputField, Textarea } from "../../components";
import FileBase from "react-file-base64";
import axios from "axios";
import { PropertyForm } from "..";
import PropertyFormUpdate from "./PropertyFormUpdate";

export default ({ match }) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  const handleData = (formData) => {
    setData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/propertieroute/${match.params.id}`, data)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return <PropertyFormUpdate onSubmit={handleSubmit} formdata={handleData} />;
};
