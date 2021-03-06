import React, { useState, useEffect } from 'react'
import { CheckSession, InputField, Textarea } from '../../components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import uuid from 'react-uuid'
import SelectImage from './../../icons/add.svg'
import replaceImage from './../../icons/reload.svg'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [file, setFile] = useState()
  const [dates, setDates] = useState([])
  const [formValid, setFormValid] = useState(false)
  const [preview, setPreview] = useState(false)
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
    firebaseRef: uuid(),
  })

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDayClick = (day) => {
    let currentDay = new Date(day).getTime()
    let newArray = [...dates]
    let indexItem = newArray.indexOf(currentDay)

    indexItem === -1 ? newArray.push(currentDay) : newArray.splice(indexItem, 1)
    setDates(newArray)
  }

  useEffect(() => {
    // console.log(data)
    setData((prev) => ({
      ...prev,
      dates: dates?.map((date) => new Date(date)),
    }))
  }, [dates])

  const handleFile = (e) => {
    const newFile = e.target.files[0]
    newFile['id'] = uuid()
    setFile(newFile)
    setData((prev) => ({ ...prev, image: newFile.id }))
  }

  useEffect(() => {
    // console.log(preview)
  }, [preview])

  useEffect(() => {
    console.log(data)
    if (
      data.street &&
      data.houseNumber &&
      data.zip &&
      data.city &&
      data.description &&
      data.title &&
      data.start &&
      data.end &&
      data.price &&
      data.dates.length !== 0 &&
      file !== undefined
    ) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [data, file])

  return (
    <React.Fragment>
      <section>
        <h1>Fill out the form below to create your event</h1>
      </section>
      <section>
        <h2>When will your event take place?</h2>

        <div className="date-and-time">
          <DayPicker
            selectedDays={data.dates}
            onDayClick={handleDayClick}
            disabledDays={{ before: new Date() }}
          />
          <div className="wrapper">
            <div className="time-group">
              <h3>Starthour</h3>
              <InputField
                name="start"
                onChange={handleChange}
                placeholder="13"
                type="time"
                className="main-input-field"
              />
            </div>
            <div className="time-group">
              <h3>Endhour</h3>
              <InputField
                name="end"
                onChange={handleChange}
                placeholder="00"
                type="time"
                className="main-input-field"
              />
            </div>
          </div>
        </div>
      </section>

      <form
        onSubmit={props.onSubmit}
        formdata={props.formdata(data)}
        file={props.file(file)}
        preview={props.preview(preview)}
      >
        <section className="flex-col flex-j-center flex-a-center">
          <h2>Event image</h2>
          <div className="file-upload-cta fit edit">
            <input type="file" onChange={handleFile} multiple />

            <button id="show-custom-file-btn-edited">
              <img
                src={file ? replaceImage : SelectImage}
                className="upload-icons"
                alt=""
              />
            </button>
          </div>

          <div>
            <img
              src={file && URL.createObjectURL(file)}
              className={data?.image ? 'wallphoto' : ''}
              alt={data?.image ? 'Event wallphoto' : ''}
            />
          </div>
        </section>
        <section>
          <h2>General information</h2>
          <InputField
            name="title"
            placeholder="Title"
            type="text"
            onChange={handleChange}
            className="main-input-field"
          />
          <Textarea
            name="description"
            placeholder="Description"
            type="textarea"
            onChange={handleChange}
            className="main-input-field"
          />
          <div className="form-row">
            <div className="form-col-lmd">
              <InputField
                name="price"
                placeholder="Price"
                type="number"
                onChange={handleChange}
                className="main-input-field"
              />
            </div>
            <div className="form-col-md">
              <p className="form-hour-field">Price in Eur</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Address</h2>
          <div className="form-row">
            <div className="form-col-lg">
              <InputField
                name="street"
                onChange={handleChange}
                placeholder="Street"
                type="text"
                className="main-input-field"
              />
            </div>
            <div className="form-col-sm">
              <InputField
                name="houseNumber"
                onChange={handleChange}
                placeholder="No"
                type="text"
                className="main-input-field"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-sm">
              <InputField
                name="zip"
                onChange={handleChange}
                placeholder="Zip"
                type="number"
                className="main-input-field"
              />
            </div>
            <div className="form-col-lg">
              <InputField
                name="city"
                onChange={handleChange}
                placeholder="City"
                type="text"
                className="main-input-field"
              />
            </div>
          </div>
        </section>

        {/* <input type="submit" value="Submit" className="main-input-field" /> */}
      </form>

      <section>
        {!formValid ? (
          <h3 className="form-message">
            To continue fill out all fields, pick at least one date and a start
            and end hour. Also choose a wallpaper for your event.
          </h3>
        ) : (
          ''
        )}
      </section>
      <button
        className={formValid ? 'main-btn' : 'main-btn disabled-btn'}
        onClick={() => setPreview(!preview)}
      >
        Review info
      </button>
    </React.Fragment>
  )
}
