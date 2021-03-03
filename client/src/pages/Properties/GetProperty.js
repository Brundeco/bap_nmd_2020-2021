import React, { useState, useEffect } from "react";
import Event1 from "./../../images/event-1.jpg";
import Event2 from "./../../images/event-4.jpg";
import Event3 from "./../../images/event-2.jpg";
import Event4 from "./../../images/event-3.jpg";
import axios from "axios";
import { PrevPage } from "../../components";
import ImageSlider from "../../components/ImageSlider";

export default ({ match }) => {
  const [data, setData] = useState();

  useEffect(() => {
    console.log("Show prop pleaaasse");
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data));
  }, []);

  const images = [
    { image: Event1 },
    { image: Event2 },
    { image: Event3 },
    { image: Event4 },
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="property-screen">
      <div className="subject-image">
        <ImageSlider slides={images} />
      </div>
      <div className="wrapper">
        <PrevPage />
        <h1>Hoogstraat 23, 9000 Gent</h1>
        <h2>By Leda Lenskens | created on 16 feb, 2021</h2>
        <p>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <div className="grid">
          <div className="row">
            <div className="col">
              <h3>Dayprice</h3>
              <p>€ 250.00</p>
            </div>
            <div className="col">
              <h3>Sq Meter</h3>
              <p>95 m2</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h3>Natural light</h3>
              <p>Moderate</p>
            </div>
            <div className="col">
              <h3>Address</h3>
              <p>
                Hogstraat 32, <br />
                9000 Gent
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h3>Available data</h3>
              <p>Datepicker here</p>
            </div>
            <div className="col">
              <h3>Contact info</h3>
              <p>
                De Coene Bruno <br /> decoene.bruno@hotmail.com <br />
                0496/47.46.66{" "}
              </p>
            </div>
          </div>
        </div>
        <section className="cta-section">
          <button className="main-btn">Contact owner</button>
          <button className="main-btn">Make reservation</button>
        </section>
      </div>
    </div>
  );
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
