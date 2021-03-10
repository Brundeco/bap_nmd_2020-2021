import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyFormUpdate from "./PropertyFormUpdate";

export default ({ match }) => {
  const [currentProprety, setCurrentProprety] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setCurrentProprety(res.data));
  }, []);

  const handleData = (formData) => {
    // console.log(formData)
    setData(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    axios
      .put(`http://localhost:5000/properties/${match.params.id}`, data)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
   console.log(data)
  }, [data]);

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PropertyFormUpdate
          onSubmit={handleSubmit}
          formdata={handleData}
          currentdata={currentProprety}
        />
      </div>
    </div>
  );
};
