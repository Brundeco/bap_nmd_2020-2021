import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Preloader, PrevPage } from "../../components";
import ImageSlider from "../../components/ImageSlider";

export default ({ match }) => {
  const [data, setData] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("Show prop pleaaasse");
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
    let tmpArr = [];
    data?.images?.map((item, i) => {
      tmpArr.push({ image: item });
      setImages(tmpArr);
    });
  }, [data]);

  if (data != undefined) {
    return (
      <div className="property-screen">
        <div className="subject-image">
          <ImageSlider slides={images} />
        </div>
        <div className="wrapper">
          <PrevPage />
          <h1>
            {data?.street +
              " " +
              data?.houseNumber +
              ", " +
              data?.zip +
              " " +
              data?.city}
          </h1>
          <h2>By Leda Lenskens | created on 16 feb, 2021</h2>
          <p>{data?.description}</p>
          <div className="grid">
            <div className="row">
              <div className="col">
                <h3>Dayprice</h3>
                <p>€ {data?.price} </p>
              </div>
              <div className="col">
                <h3>Sq Meter</h3>
                <p>{data?.surface} m2</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Natural light</h3>
                <p>{data?.light}</p>
              </div>
              <div className="col">
                <h3>Address</h3>
                <p>
                  {data?.street + " " + data?.houseNumber + ", "} <br />
                  {data?.zip + " " + data?.city}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Available data</h3>
                <p> {data?.date} </p>
              </div>
              <div className="col">
                <h3>Contact info</h3>
                <p>
                  {data?.firstname + " " + data?.lastname} <br /> {data?.email}
                  <br />
                  {data?.phone}
                </p>
              </div>
            </div>
          </div>
          <section className="cta-section">
            <Link to={{ pathname: `/chat/${data?.author_id}/${data?.author}` }}>
              <li>Contact owner</li>
            </Link>
            <button className="main-btn">Make reservation</button>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Preloader text="Events are loading" />
      </React.Fragment>
    );
  }
};

// return (
//   <div className="property-list">
//     <div className="property-item">
//       <h2> {data?.title}</h2>
//       <h4> Author: {data?.author} </h4>
//       <h4> Author ID: {data?.author_id} </h4>
//       <div className="property-images">
//         {data?.images.map(function (image, i) {
//           return <img src={image} alt="" />;
//         })}
//       </div>
//       <ul>
//         <Link to={{ pathname: `/chat/${data?.author_id}/${data?.author}` }}>
//           <li>Contact owner</li>
//         </Link>
//       </ul>
//     </div>
//   </div>
// );
// };
