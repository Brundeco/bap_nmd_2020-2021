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
  const [files, setFiles] = useState([])
  const [dates, setDates] = useState([])
  const [formValid, setFormValid] = useState(false)
  const [preview, setPreview] = useState(false)
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
    images: [],
    firebaseRef: uuid(),
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
    email: user?.email,
  })

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFiles = (e) => {
    Array.from(e.target.files).map((file) => {
      const newFile = file
      newFile['id'] = uuid()
      setFiles((prevState) => [...prevState, newFile])
    })
  }

  useEffect(() => {
    let tmpArr = []
    files.forEach((element) => {
      tmpArr.push(element.id)
      setData((prev) => ({ ...prev, images: tmpArr }))
    })
  }, [files])

  const handleDayClick = (day) => {
    console.log(day)
    let currentDay = new Date(day).getTime()
    let newArray = [...dates]
    let indexItem = newArray.indexOf(currentDay)

    indexItem === -1 ? newArray.push(currentDay) : newArray.splice(indexItem, 1)
    setDates(newArray)
  }

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      dates: dates?.map((date) => new Date(date)),
    }))
  }, [dates])

  useEffect(() => {
    if (
      data.firstname &&
      data.lastname &&
      data.phone &&
      data.email &&
      data.street &&
      data.houseNumber &&
      data.zip &&
      data.city &&
      data.description &&
      data.price &&
      data.surface &&
      data.areas &&
      data.dates.length !== 0 &&
      files?.length > 1
    ) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [data, files])

  const handleDeleteNewFiles = (e, data, i) => {
    e.preventDefault()
    let newImgArr = []
    files.map((file) => newImgArr.push(file))
    newImgArr.splice(i, 1)
    setFiles(newImgArr)
  }

  return (
    <React.Fragment>
      <section>
        <h1>Fill out the form below to start hosting your property</h1>
      </section>
      <section>
        <h2>Dates you will be hosting</h2>
        <DayPicker
          selectedDays={data.dates}
          onDayClick={handleDayClick}
          disabledDays={{ before: new Date() }}
        />
      </section>
      <form
        onSubmit={props.onSubmit}
        formdata={props.formdata(data)}
        files={props.files(files)}
        preview={props.preview(preview)}
      >
        <section>
          <h2>General information</h2>
          <Textarea
            name="description"
            placeholder="Description about your place"
            type="textarea"
            onChange={handleChange}
            className="main-input-field"
            required
          />
          <div className="form-row">
            <div className="form-col-md">
              <InputField
                name="price"
                placeholder="Daily price"
                type="number"
                onChange={handleChange}
                className="main-input-field"
                required
              />
            </div>
            <div className="form-col-md">
              <InputField
                name="surface"
                onChange={handleChange}
                placeholder="Square meters"
                type="number"
                className="main-input-field"
                required
              />
            </div>
          </div>
          <InputField
            name="areas"
            placeholder="Amount of areas"
            type="number"
            onChange={handleChange}
            className="main-input-field"
            required
          />
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
                required
              />
            </div>
            <div className="form-col-sm">
              <InputField
                name="houseNumber"
                onChange={handleChange}
                placeholder="No"
                type="text"
                className="main-input-field"
                required
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
                required
              />
            </div>
            <div className="form-col-lg">
              <InputField
                name="city"
                onChange={handleChange}
                placeholder="City"
                type="text"
                className="main-input-field"
                required
              />
            </div>
          </div>
        </section>

        <section>
          <h2>Contact info</h2>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={data?.email ? data?.email : user?.email}
            required
          />
          <InputField
            name="phone"
            placeholder="Phone"
            type="number"
            onChange={handleChange}
            value={data?.phone ? data?.phone : user?.phone}
            required
          />
          <InputField
            name="firstname"
            placeholder="Firstname"
            type="text"
            onChange={handleChange}
            value={data?.firstname ? data?.firstname : user?.firstname}
            required
          />
          <InputField
            name="lastname"
            placeholder="Lastname"
            type="text"
            onChange={handleChange}
            value={data?.lastname ? data?.lastname : user?.lastname}
            required
          />
        </section>

        <section className="flex-col flex-j-center flex-a-center">
          <h2>Images</h2>

          <div className="file-upload-cta fit edit">
            <input type="file" onChange={handleFiles} multiple />

            <button id="show-custom-file-btn-edited">
              <img src={SelectImage} className="upload-icons" alt="" />
            </button>
          </div>

          <div className="img-gallery">
            {files.length !== 0 ? <h4>Click on an image to delete</h4> : ''}

            {files?.map(function (item, i) {
              return (
                <React.Fragment key={i}>
                  <div className="img-box">
                    <img src={URL.createObjectURL(item)} alt="" />
                    <button
                      className="delete-item f-width-f-height"
                      onClick={(e) => handleDeleteNewFiles(e, data, i)}
                    ></button>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </section>
      </form>

      <section>
        {!formValid ? (
          <h3 className="form-message">
            To continue fill out all fields, pick at least one date and select at least two
            pictures.
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
