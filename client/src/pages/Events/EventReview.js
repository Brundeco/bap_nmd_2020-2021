import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Preloader, PrevPage, ConvertDate } from '../../components'
import ImageSlider from '../../components/ImageSlider'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const [image, setImage] = useState()
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    setPreview(props.preview)
    console.log(props.preview)
  }, [props.preview])

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  useEffect(() => {
    setImage(props.files)
  }, [props.files])

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
    <React.Fragment>
      <div
        className={
          preview
            ? 'review-screen show'
            : 'review-screen hide'
        }
        // className="review-screen show"
        newpreview={props.newpreview(preview)}
      >
        <div className="page-wrapper">
          <h1>Please review your event information below</h1>

          <div className="review-files">
            <h2>Event wallpaper</h2>
            <div className="img-box">
              <img src={image && URL.createObjectURL(image)} alt="" />
            </div>
          </div>

          <h2>Available dates</h2>
          <DayPicker
            selectedDays={data?.dates}
            disabledDays={{ before: new Date() }}
          />

          <div className="content">
            <div className="general-info">
              <h2>General info</h2>
              <p>{data?.title}</p>
              <p>{data?.description}</p>
            </div>
            <div className="address">
              <h2>Event location</h2>
              <p>{data?.street}</p>
              <p>{data?.houseNumber}</p>
              <p>{data?.zip}</p>
              <p>{data?.city}</p>
            </div>
            <div className="contact-info">
              <h2>Practical</h2>
              <p> {`Event starts at ${data?.startHrs}  ${data?.startMins}`} </p>
              <p> {`Event ends at ${data?.endHrs}  ${data?.endMins}`} </p>
            </div>
            <p></p>
          </div>
          <section className="cta-bottom-section">
            <button
              className="main-btn"
              onClick={(preview) => setPreview(!preview)}
            >
              Let's make some changes
            </button>
            <button className="main-btn" onClick={(e) => props.handleSubmit(e)}>
              Ok, create property
            </button>
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}
