import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { app } from '../../base'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import CloseIcon from './../../icons/new-close.svg'
import { ConvertDate } from '../../components'

export default ({ match }) => {
  let history = useHistory()
  const [property, setProperty] = useState()
  const [reservation, setReservation] = useState()
  const [dates, setDates] = useState([])
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [client, setClient] = useState()

  const isDayDisabled = (day) => {
    return !dates.some((disabledDay) => DateUtils.isSameDay(day, disabledDay))
  }

  useEffect(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/properties/${match.params.property_id}`
      )
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err))

    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/reservations/detail/${match.params.reservation_id}`
      )
      .then(async (res) => {
        setReservation(res.data)

        await axios
          .get(`${process.env.REACT_APP_API_URL}/users/${res.data.client_id}`)
          .then((res) => setClient(res.data))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
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
        <h2 className="main-title">Your property was booked</h2>

        <div className="info-group">
          <p className="semi-bold">Amount paid by customer</p>
          <p>€{reservation?.price}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Payment date</p>
          <p>{ConvertDate(reservation?.createdAt)}</p>
        </div>
      </section>

      <section>
        <h2 className="main-title">Cient details</h2>
        <div className="info-group">
          <p className="semi-bold">Full name</p>
          <p>{`${client?.firstname} ${client?.lastname}`} </p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Email</p>
          <p>{client?.email}</p>
        </div>
        <div className="info-group">
          <p className="semi-bold">Phone</p>
          <p>{client?.phone}</p>
        </div>
      </section>

      <section>
        <div className="info-group dates flex-col">
          <p className="semi-bold">Reserved dates</p>
          <DayPicker selectedDays={dates} disabledDays={isDayDisabled} />
        </div>
      </section>
    </div>
  )
}
