import React, { useState, useEffect } from 'react'
import { CheckSession } from '../../components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

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
        className={preview ? 'review-screen show' : 'review-screen hide'}
        newpreview={props.newpreview(preview)}
      >
        <section>
          <h1>Please review your event information below</h1>

          <div className="review-files">
            <h2>Event wallpaper</h2>
            <div className="img-box">
              <img src={image && URL.createObjectURL(image)} alt="" />
            </div>
          </div>

          <div className="date-and-time">
            <DayPicker
              selectedDays={data?.dates}
              disabledDays={{ before: new Date() }}
            />
            <div className="wrapper">
              <div className="time-group">
                <h3>Starthour</h3>
                <p> {data?.start} hr </p>
              </div>
              <div className="time-group">
                <h3>Endhour</h3>
                <p> {data?.end} hr </p>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="general-info">
              <h2>General info</h2>
              <p>{data?.title}</p>
              <p>{data?.description}</p>
            </div>
            <div className="address">
              <h2>Event location</h2>

              <p>
                {`${data?.street} ${data?.houseNumber}, ${data?.zip} ${data?.city}`}
              </p>
            </div>
          </div>
          <section className="cta-bottom-section">
            <button
              className="main-btn"
              onClick={(preview) => setPreview(!preview)}
            >
              Let's make some changes
            </button>
            <button className="main-btn" onClick={(e) => props.handleSubmit(e)}>
              Ok, create event
            </button>
          </section>
        </section>
      </div>
    </React.Fragment>
  )
}
