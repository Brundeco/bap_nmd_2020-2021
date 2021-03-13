import React, { useState, useEffect } from "react";
import { CheckSession, PrevPage } from "./../../components";
import axios from "axios";
import { PropertyFormCreate } from "..";
import { app } from "../../base";
import uuid from "react-uuid";

export default (props) => {
  CheckSession(localStorage.getItem("jwt"));

  const [data, setData] = React.useState();
  const [files, setFiles] = useState([]);
  const storageRef = app.storage().ref();

  const handleData = (formData) => {
    setData(formData);
  };

  const handleFiles = (files) => {
    setFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(files);

    files.forEach((file) => {
      storageRef
        .child(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .then((res) => {
          console.log(res);
        });
    });

    // console.log(data);
    axios.post("http://localhost:5000/properties", data);
  };

  // const onChange = (e) => {
  //   Array.from(e.target.files).map((file, i) => {
  //     const newFile = file;
  //     newFile["id"] = uuid();
  //     setFiles((prevState) => [...prevState, newFile]);
  //   });
  // };

  // const handleClick = () => {
  //   files.forEach((file) => {
  //     storageRef
  //       .child(`images/${file.id}`)
  //       .put(file)
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   });
  // };

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <PropertyFormCreate
          onSubmit={handleSubmit}
          formdata={handleData}
          files={handleFiles}
        />
        {/* <input type="file" onChange={onChange} multiple /> */}
        {/* <button onClick={handleClick}>Submit upload</button> */}
      </div>
    </div>
  );
};
