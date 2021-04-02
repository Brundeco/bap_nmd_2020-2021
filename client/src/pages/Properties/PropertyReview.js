import React, { useState, useEffect } from 'react'
import { CheckSession } from '../../components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const [images, setImages] = useState([])
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    setPreview(props.preview)
  }, [props.preview])

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  useEffect(() => {
    setImages(props.files)
  }, [props.files])

  useEffect(() => {
    images.forEach((img) => {
      console.log(URL.createObjectURL(img))
    })
  }, [images])

  return (
    <React.Fragment>
      <div
        className={preview ? 'review-screen show' : 'review-screen hide'}
        // className="property-preview-screen show"
        newpreview={props.newpreview(preview)}
      >
        <div className="page-wrapper">
          <h1>Please review your property information below</h1>

          <div className="review-files">
            <h2>Images</h2>
            {images?.map(function (item, i) {
              return (
                <React.Fragment key={i}>
                  <div className="img-box">
                    <img src={URL.createObjectURL(item)} alt="" />
                  </div>
                </React.Fragment>
              )
            })}
          </div>

          <h2>Available dates</h2>
          <DayPicker
            selectedDays={data?.dates}
            disabledDays={{ before: new Date() }}
          />

          <div className="content">
            <div className="general-info">
              <h2>General info</h2>
              <p>{data?.description}</p>
              <p>{data?.price}</p>
              <p>{data?.surface}</p>
              <p>{data?.light}</p>
            </div>
            <div className="address">
              <h2>Property location</h2>
              <p>{data?.street}</p>
              <p>{data?.houseNumber}</p>
              <p>{data?.zip}</p>
              <p>{data?.city}</p>
            </div>
            <div className="contact-info">
              <h2>Your contact info</h2>
              <p>{data?.email}</p>
              <p>{data?.phone}</p>
              <p>{data?.firstname}</p>
              <p>{data?.lastname}</p>
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
