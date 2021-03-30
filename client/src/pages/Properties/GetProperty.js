import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Preloader, PrevPage, ConvertDate } from '../../components'
import ImageSlider from '../../components/ImageSlider'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { app } from '../../base'
import LikeIconWhite from './../../icons/heart-full-white.svg'
import LikeIconBlue from './../../icons/heart-full-blue.svg'
import PriceIcon from './../../icons/property-detail/price.svg'
import SurfaceIcon from './../../icons/property-detail/surface.svg'
import CalenderIcon from './../../icons/property-detail/calendar.svg'
import ContactIcon from './../../icons/property-detail/contact.svg'
import AddressIcon from './../../icons/property-detail/address.svg'
import LightIcon from './../../icons/property-detail/light.svg'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [propertyCreatedAt, setPropertyCreatedAt] = useState()
  const [data, setData] = useState()
  const [images, setImages] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [dates, setDates] = useState([])
  const storageRef = app.storage().ref()
  const [hoverState, setHoverState] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [conversationId, setConversationId] = useState()
  const [booking, setBooking] = useState({
    client: user.username,
    client_id: user.id,
  })
  const handleIndex = () => {}

  const isDayDisabled = (day) => {
    return !availableDates.some((disabledDay) =>
      DateUtils.isSameDay(day, disabledDay)
    )
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${match.params.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    // console.log(data)
    // Get Firestore img Urls
    const promises = data?.images
      ?.map(async (el) => {
        const img = await storageRef
          .child(data?.firebaseRef + '/' + el)
          .getDownloadURL()
        return img
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        setImages((prevImgs) => [...prevImgs, ...newArray])
      })

    let tmpDates = []
    data?.dates?.map((item) => {
      tmpDates.push(new Date(item))
      setAvailableDates(tmpDates)
    })
    setBooking((prev) => ({
      ...prev,
      owner_id: data?.author_id,
      owner: data?.author,
    }))
    setPropertyCreatedAt(ConvertDate(data?.createdAt))
  }, [data])

  useEffect(() => {
    console.log(images)
  }, [images])

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return
    }
    let currentDay = new Date(day).getTime()
    let newArray = [...dates]
    let indexItem = newArray.indexOf(currentDay)

    indexItem === -1 ? newArray.push(currentDay) : newArray.splice(indexItem, 1)
    setDates(newArray)
  }

  useEffect(() => {
    setSelectedDates(dates?.map((date) => new Date(date)))
  }, [dates])

  useEffect(() => {
    setBooking((prev) => ({ ...prev, dates: selectedDates }))
  }, [selectedDates])

  const handleReservation = (e) => {
    e.preventDefault()
    axios
      .put(
        `http://localhost:5000/properties/book/${match.params.id}`,
        booking.dates
      )
      .then((res) => setData(res.data))
  }

  useEffect(() => {
    axios
      .post('http://localhost:5000/messages/conversation_id', {
        from: user.id,
        to: data?.author_id,
      })
      .then((res) => setConversationId(res.data))
      .catch((err) => console.log(err))
  }, [data])

  if (data != undefined) {
    return (
      <div className="property-detail-screen">
        <div className="subject-image">
          <ImageSlider slides={images} index={handleIndex} />
        </div>
        <div className="wrapper">
          <PrevPage />
          <h2>{`${data?.street} ${data?.houseNumber},  ${data?.zip} ${data?.city}`}</h2>

          <div className="cta-section-top">
            <div className="left">
              <img src={user.image} alt="" />
              <p> {`${data?.firstname} ${data?.lastname}`} </p>
            </div>
            <div className="right">
              <button
                onMouseEnter={() => setHoverState(!hoverState)}
                onMouseLeave={() => setHoverState(!hoverState)}
              >
                <img src={hoverState ? LikeIconBlue : LikeIconWhite} alt="" />
              </button>
            </div>
          </div>
          <h3>Added on {propertyCreatedAt}</h3>
          <p className="description"> {data?.description}</p>

          <section className="general-info">
            <h2 className="general-info-title">General info</h2>
            <div className="item">
              <div className="left">
                <img src={PriceIcon} alt="" />
              </div>
              <div className="center">
                <h4>Price</h4>
                <p>Daily</p>
              </div>
              <div className="right">
                <p>€ {data?.price} </p>
              </div>
            </div>

            <div className="item">
              <div className="left">
                <img src={SurfaceIcon} alt="" />
              </div>
              <div className="center">
                <h4>Available space</h4>
                <p>Square meter</p>
              </div>
              <div className="right">
                <p>{data?.surface} m2 </p>
              </div>
            </div>

            <div className="item">
              <div className="left">
                <img src={LightIcon} alt="" />
              </div>
              <div className="center">
                <h4>Light</h4>
                <p>Natural light</p>
              </div>
              <div className="right">
                <p> {data?.light} </p>
              </div>
            </div>

            <div className="item">
              <div className="left">
                <img src={CalenderIcon} alt="" />
              </div>
              <div className="center">
                <h4>Calendar</h4>
                <p>Available data</p>
              </div>
              <div className="right">
                <p onClick={() => setShowCalendar(!showCalendar)}>
                  {showCalendar ? 'Close' : 'Open'}
                </p>
              </div>
            </div>
          </section>

          <div className={showCalendar ? 'calendar-show' : 'calendar-hide'}>
            <DayPicker
              selectedDays={selectedDates}
              onDayClick={handleDayClick}
              disabledDays={isDayDisabled}
            />
          </div>

          <section className="extra-info">
            <div className="address">
              <div className="img-box">
                <img
                  src={AddressIcon}
                  alt="address-icon"
                  className="address-icon"
                />
              </div>
              <p>
                {`${data?.street} ${data?.houseNumber},`} <br />{' '}
                {`${data?.zip} ${data?.city} `}
              </p>
            </div>
            <div className="contact">
              <img
                src={ContactIcon}
                alt="contact-icon"
                className="contact-icon"
              />
              <p>
                {`${data?.firstname} ${data?.lastname}`} <br />
                {`${data?.email}`} <br />
                {`${data?.phone}`}
              </p>
            </div>
          </section>
          <section className="cta-bottom-section">
            <button className="main-btn" onClick={(e) => handleReservation(e)}>
              Make reservation
            </button>
            <button
              onClick={() =>
                (window.location = `/chat/${data?.author_id}/${data?.author}/${conversationId}`)
              }
            >
              Chat with owner
            </button>
          </section>
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text="property" />
      </React.Fragment>
    )
  }
}
