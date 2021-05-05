import React, { useState, useEffect } from 'react'
import { CheckSession } from '../../components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = useState()
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    setPreview(props.preview)
  }, [props.preview])

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <React.Fragment>
      <div
        className={preview ? 'review-screen show' : 'review-screen hide'}
        newpreview={props.newpreview(preview)}
      >
        <section>
          <h1>Please review your property information below</h1>
          <div className="review-files">
            <h2 className="mg-bottom-title">Images</h2>
            <div className="img-gallery">
              {props.files?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="img-box">
                      <img src={URL.createObjectURL(item)} alt="" />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mg-bottom-title">Days you will be hosting</h2>
          <DayPicker
            selectedDays={data?.dates}
            disabledDays={{ before: new Date() }}
          />
        </section>

        <section>
          <h2 className="mg-bottom-title">General info</h2>
          <div className="info-group">
            <p className="semi-bold">Description</p>
            <p>{data?.description}</p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Daily price</p>
            <p>{data?.price}</p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Surface</p>
            <p>{data?.surface}</p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Areas</p>
            <p>{data?.areas}</p>
          </div>
        </section>

        <section>
          <h2 className="mg-bottom-title">Location</h2>
          <div className="info-group">
            <p className="semi-bold">Address</p>
            <p>
              {`${data?.street}
              ${data?.houseNumber}, 
              ${data?.zip}
              ${data?.city}`}
            </p>
          </div>
        </section>

        <section>
          <h2 className="mg-bottom-title">Your contact details</h2>
          <div className="info-group">
            <p className="semi-bold">Email</p>
            <p>{data?.email} </p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Phone</p>
            <p>{data?.phone} </p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Firstname</p>
            <p>{data?.firstname} </p>
          </div>
          <div className="info-group">
            <p className="semi-bold">Lastname</p>
            <p>{data?.lastname} </p>
          </div>
        </section>

        <section>
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
        </section>
      </div>
    </React.Fragment>
  )
}
