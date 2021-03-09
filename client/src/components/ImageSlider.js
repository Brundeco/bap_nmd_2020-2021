import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { FontAwesome } from "./../components";
import { Link } from "react-router-dom";

import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const ImageSlider = (props) => {
  const SliderData = props.slides;
  const [current, setCurrent] = useState(0);
  const [ids, setIds] = useState();
  const length = props.slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    setIds(props.id);
  }, [SliderData]);

  const arrLength = props.slides.length;

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider" index={props.index(current)}>
      <button
        onClick={prevSlide}
        className="slide-arrow-homepage left"
        // style={current == 0 ? { display: "none" } : { display: "block" }}
      >
        <FontAwesome icon={faChevronLeft} className="left-arrow" />
      </button>
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            <Link to={{ pathname: "/event/" + ids?.[current].id }}>
              {index === current && (
                <img src={slide.image} alt="image" className="image" />
              )}
            </Link>
          </div>
        );
      })}
      <button
        onClick={nextSlide}
        className="slide-arrow-homepage right"
        // style={
        //   current == arrLength ? { display: "none" } : { display: "block" }
        // }
      >
        <FontAwesome icon={faChevronRight} className="right-arrow" />
      </button>
    </section>
  );
};

export default ImageSlider;
