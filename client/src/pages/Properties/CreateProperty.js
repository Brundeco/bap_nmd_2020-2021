import React, { useState, useEffect } from "react";
import { CheckSession, PrevPage } from "./../../components";
import axios from "axios";
import { PropertyFormCreate } from "..";
import { app } from "../../base";

export default (props) => {
  CheckSession(localStorage.getItem("jwt"));

  const [data, setData] = React.useState();
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const database = app.database();
  const storageRef = app.storage();

  const handleData = (formData) => {
    setData(formData);
  };

  const handleFiles = (files) => {
    setFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    files.forEach((file) => {
      storageRef
        .ref(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // setProgress(progress);
            console.log(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storageRef
              .ref(`${data.firebaseRef}`)
              .child(file.id)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                setFileUrls((prevState) => [...prevState, url]);
              });
          }
        );
    });
    // axios.post("http://localhost:5000/properties", data);
  };

  useEffect(() => {
    console.log(fileUrls);
  }, [fileUrls]);

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <PropertyFormCreate
          onSubmit={handleSubmit}
          formdata={handleData}
          files={handleFiles}
        />
      </div>
    </div>
  );
};
