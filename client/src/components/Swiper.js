import React, { useState, useEffect } from 'react'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default (props) => {
  const [slides, setSlides] = useState([])
  const [formatImgs, setFormatImgs] = useState(false)
  useEffect(() => {
    console.log(props.slides)
    if (props.slides) setSlides(props.slides)
  }, [props.slides])

  useEffect(() => {
    setFormatImgs(props.formatimgs)
  }, [props.formatimgs])

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      //   scrollbar={{ draggable: false }}
    >
      {slides.map((el) => {
        return (
          <SwiperSlide>
            <img src={formatImgs ? URL.createObjectURL(el) : el} alt="" />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
