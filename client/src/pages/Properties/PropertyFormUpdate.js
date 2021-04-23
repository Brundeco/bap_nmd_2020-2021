import React, { useState, useEffect } from 'react'
import { CheckSession, InputField, Textarea } from '../../components'
import SelectImage from './../../icons/add-img.svg'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import uuid from 'react-uuid'
import { app } from '../../base'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [files, setFiles] = useState([])
  const [thumbnails, setThumbnails] = useState([])
  const [newImgArr, setNewImgArr] = useState([])
  const [dates, setDates] = useState([])
  const [formValid, setFormValid] = useState(false)
  const storageRef = app.storage().ref()
  const [data, setData] = React.useState({
    author: user.username,
    author_id: user.id,
    images: [],
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
    setData((prev) => ({
      ...prev,
      dates: dates?.map((date) => new Date(date)),
    }))
  }, [dates])

  useEffect(() => {
    setData(props.currentdata)

    let newArray = [...dates]
    props.currentdata?.dates?.map((day) =>
      newArray.push(new Date(day).getTime())
    )
    setDates(newArray)
  }, [props.currentdata])

  useEffect(() => {
    let tmpArr = data?.images
    console.log(tmpArr)
    files.forEach((element) => {
      if (tmpArr.indexOf(element.id) == -1) tmpArr.push(element.id)
      setData((prev) => ({ ...prev, images: tmpArr }))
    })
  }, [files])

  useEffect(() => {
    console.log(data)
    let currentArr = []
    data?.images?.map((el) => currentArr.push(el))
    setNewImgArr(currentArr)

    try {
      const promises = data?.images
        ?.map(async (el) => {
          // console.log(storageRef.child(data?.firebaseRef + '/' + el))
          const img = await storageRef
            .child(data?.firebaseRef + '/' + el)
            .getDownloadURL()
            .catch((err) => console.log(err))
          return img
        })
        .filter(Boolean)
      const promisesArr = promises?.flat()
      promisesArr &&
        Promise.all(promisesArr).then((newArray) => {
          setThumbnails((prevImgs) => [...newArray])
        })
    } catch (error) {
      console.log(error)
    }
  }, [data])

  const handleDelete = (e, data, i) => {
    e.preventDefault()
    newImgArr.splice(i, 1)
    setData((prev) => ({ ...prev, images: newImgArr }))
  }

  const handleDeleteNewFiles = (e, i) => {
    e.preventDefault()
    let newImgArr = []
    files.map((file) => newImgArr.push(file))
    newImgArr.splice(i, 1)
    setFiles(newImgArr)
  }

  const handleFiles = (e) => {
    Array.from(e.target.files).map((file) => {
      const newFile = file
      newFile['id'] = uuid()
      setFiles((prevState) => [...prevState, newFile])
    })
  }

  useEffect(() => {
    if (
      (data?.firstname &&
        data?.lastname &&
        data?.phone &&
        data?.email &&
        data?.street &&
        data?.houseNumber &&
        data?.zip &&
        data?.city &&
        data?.description &&
        data?.price &&
        data?.surface &&
        data?.areas &&
        data?.dates.length !== 0 &&
        files?.length > 1) ||
      data?.images?.length > 1
    ) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [data, files])

  const today = new Date()

  return (
    <div className="create-product-screen">
      <h1>Fill out the form below to start hosting your property</h1>
      <DayPicker
        selectedDays={data?.dates}
        onDayClick={handleDayClick}
        disabledDays={{ before: today }}
      />
      <form
        onSubmit={props.onSubmit}
        formdata={props.formdata(data)}
        files={props.files(files)}
      >
        <section>
          <h2>General information</h2>
          <Textarea
            name="description"
            placeholder="Description about your place"
            type="textarea"
            onChange={handleChange}
            className="main-input-field"
            value={data?.description}
          />
          <div className="form-row">
            <div className="form-col-md">
              <InputField
                name="price"
                placeholder="Price"
                type="number"
                onChange={handleChange}
                className="main-input-field"
                value={data?.price}
              />
            </div>
            <div className="form-col-md">
              <InputField
                name="surface"
                onChange={handleChange}
                placeholder="Square meters"
                type="number"
                className="main-input-field"
                value={data?.surface}
              />
            </div>
          </div>
          <InputField
            name="light"
            placeholder="Natural light"
            type="text"
            onChange={handleChange}
            className="main-input-field"
            value={data?.light}
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
                value={data?.street}
              />
            </div>
            <div className="form-col-sm">
              <InputField
                name="houseNumber"
                onChange={handleChange}
                placeholder="No"
                type="text"
                className="main-input-field"
                value={data?.houseNumber}
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
                value={data?.zip}
              />
            </div>
            <div className="form-col-lg">
              <InputField
                name="city"
                onChange={handleChange}
                placeholder="City"
                type="text"
                className="main-input-field"
                value={data?.city}
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
            value={data?.email}
            required
          />
          <InputField
            name="phone"
            placeholder="Phone"
            type="number"
            onChange={handleChange}
            value={data?.phone}
            required
          />
          <InputField
            name="firstname"
            placeholder="Firstname"
            type="text"
            onChange={handleChange}
            value={data?.firstname}
            required
          />
          <InputField
            name="lastname"
            placeholder="Lastname"
            type="text"
            onChange={handleChange}
            value={data?.lastname}
            required
          />
        </section>
        <section>
          <h2>Images</h2>

          <div className="file-upload-cta fit">
            <input type="file" onChange={handleFiles} multiple />
            <button id="show-custom-file-btn">
              <img src={SelectImage} alt="" />
            </button>
          </div>
          <div className="img-gallery">
            {files?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="img-box">
                    <img src={URL.createObjectURL(item)} alt="" />
                    <button
                      className="delete-item"
                      onClick={(e) => handleDeleteNewFiles(e, data, i)}
                    ></button>
                  </div>
                </React.Fragment>
              )
            })}
            {thumbnails?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <div
                    className="img-box"
                    style={
                      item == undefined
                        ? { display: 'none' }
                        : { display: 'flex' }
                    }
                  >
                    <img src={item} alt="" className="thumbnail" />
                    <button
                      className="delete-item"
                      onClick={(e) => handleDelete(e, data, i)}
                    ></button>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </section>
        <button
          className={formValid ? 'main-btn' : 'main-btn disabled-btn'}
          onClick={props.formsubmit}
        >
          Update property
        </button>{' '}
        <button className="main-btn" onClick={props.delete}>
          Delete
        </button>
      </form>
    </div>
  )
}
