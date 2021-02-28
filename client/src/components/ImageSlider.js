import React, { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // console.log(length);

  return (
    <section className="slider">
      {SliderData.map((slide, index) => {
        console.log(slide, index)
        return (
          <div className="slider-row" >
            <div
              className={index === current ? "slide active" : "slide"}
              key={1}
              onClick={prevSlide}
            >
              {index === current && (
                <img src={slide.image} alt="travel image" className="image" />
              )}
            </div>
            <div
              className={index === current ? "slide active" : "slide"}
              key={2}
              onClick={nextSlide} 
            >
              {index === current && (
                <img src={slide.image} alt="travel image" className="image" />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
