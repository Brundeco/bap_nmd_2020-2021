import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swiper from './../../components/Swiper'
import { app } from '../../base'
import PhoneIcon from './../../icons/phone.svg'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import CloseIcon from './../../icons/close.svg'
import { ConvertDate } from '../../components'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  let history = useHistory()
  const [property, setProperty] = useState()
  const [reservation, setReservation] = useState()
  const [conversationId, setConversationId] = useState()
  const [dates, setDates] = useState([])
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  console.log(match.params)

  const isDayDisabled = (day) => {
    return !dates.some((disabledDay) => DateUtils.isSameDay(day, disabledDay))
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/properties/${match.params.property_id}`
      )
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err))

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/reservations/${match.params.reservation_id}`
      )
      .then((res) => setReservation(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/messages/conversation_id`, {
        from: user.id,
        to: property?.author_id,
      })
      .then((res) => setConversationId(res.data))
      .catch((err) => console.log(err))
  }, [property])

  useEffect(() => {
    console.log(reservation)
    reservation?.dates?.map((day) => {
      setDates((prev) => [...prev, new Date(day)])
    })
  }, [reservation])

  useEffect(() => {
    const promises = property?.images
      ?.map(async (el) => {
        const img = await storageRef
          .child(property?.firebaseRef + '/' + el)
          .getDownloadURL()
        return img
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        setImages((prevImgs) => [...prevImgs, ...newArray])
      })
  }, [property])

  return (
    <div className="reservation-detail-screen">
      <button className="close-btn" onClick={() => history.goBack()}>
        <img src={CloseIcon} alt="close button" />
      </button>

      <section>
        <h2 className="main-title">Details about the reservation</h2>

        <div className="info-group">
          <p className="semi-bold">Amount paid</p>
          <p>€ {reservation?.price}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Payment date</p>
          <p>{ConvertDate(reservation?.createdAt)}</p>
        </div>

        <div className="info-group dates flex-col">
          <p className="semi-bold">Reserved dates</p>
          <DayPicker selectedDays={dates} disabledDays={isDayDisabled} />
        </div>
      </section>

      <section>
        <h2 className="main-title">Details about the property</h2>
        <div className="info-group">
          <p className="semi-bold">Dailyprice</p>
          <p>{property?.price}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Space</p>
          <p>{property?.surface}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Ares</p>
          <p>{property?.areas}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Address</p>
          <p>{`${property?.street} ${property?.houseNumber}, ${property?.zip} ${property?.city}`}</p>
        </div>
      </section>

      <section>
        <Swiper slides={images} />
      </section>

      <section>
        <h2 className="main-title">
          For further questions about your reservation we would like you to
          contact the property owner. Please use the contact details below.{' '}
        </h2>
        <section className="cta-bottom-section">
          <button className={'main-btn'} onClick={() => {}}>
            <img src={PhoneIcon} alt="" /> {`${property?.phone}`}
          </button>
          <button
            onClick={() =>
              (window.location = `/chat/${property?.author_id}/${property?.author}/${conversationId}`)
            }
          >
            Chat with owner
          </button>
        </section>
      </section>
    </div>
  )
}
