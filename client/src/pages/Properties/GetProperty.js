import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Preloader,
  PrevPage,
  ConvertDate,
  CheckSession,
  InputField,
} from '../../components'
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

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))

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
  const [formData, setFormData] = useState()
  const [show, setShow] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState()
  const [booking, setBooking] = useState({
    client: user.username,
    client_id: user.id,
  })
  const stripe = useStripe()
  const elements = useElements()
  const handleIndex = () => {}

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isDayDisabled = (day) => {
    return !availableDates.some((disabledDay) =>
      DateUtils.isSameDay(day, disabledDay)
    )
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties/${match.params.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(data)
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

    axios
      .post(`${process.env.REACT_APP_API_URL}/messages/conversation_id`, {
        from: user.id,
        to: data?.author_id,
      })
      .then((res) => setConversationId(res.data))
      .catch((err) => console.log(err))
  }, [data])

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

  const cardElementOptions = {
    hidePostalCode: true,
  }

  const handleReservation = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const billingDetails = {
      name: formData?.name,
      email: formData?.email,
      address: {
        city: formData?.city,
        line1: formData?.address,
        state: '',
        postal_code: formData?.zip,
      },
    }

    const { data: clientSecret } = await axios.post(
      `${process.env.REACT_APP_API_URL}/properties/stripe`,
      {
        amount: dates.length * data.price * 100,
      }
    )
    const cardElement = elements.getElement(CardElement)
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    })

    try {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq.paymentMethod.id,
        })
        .then(() => {
          setProcessing(false)
          setPaymentStatus('Payment successful!')

          axios
            .post(`${process.env.REACT_APP_API_URL}/reservations`, {
              dates,
              price: dates.length * data.price,
              property_owner_id: data.author_id,
              property_owner_firstname: data.firstname,
              property_owner_lastname: data.lastname,
              property_owner_email: data.email,
              property_owner_phone: data.phone,
              property_id: data._id,
              property_address: `${data.street} ${data.houseNumber}, ${data.zip} ${data.city}`,
              client_id: user.id,
            })
            .then(() => {
              axios
                .put(
                  `${process.env.REACT_APP_API_URL}/properties/book/${match.params.id}`,
                  booking.dates
                )
                .then(() => {
                  console.log('Dates in database are editted!')
                  axios
                    .post(`${process.env.REACT_APP_API_URL}/mailing`, {
                      message: `Hey ${
                        user.username
                      }, your booking was completed. You paid a total of € ${
                        dates.length * data.price
                      }. If you have any questions concerning your reservation, please contact ${
                        data.firstname
                      } ${
                        data.lastname
                      } via our built in chat or on the following email: ${
                        data.email
                      }  Thanks for using Suitswap! Kind regards`,
                      receiver: user.email,
                    })
                    .then((res) => {
                      console.log(res.data.message)
                      // window.location = `/reservations/${user.id}`
                    })
                    .catch((err) => {
                      console.log(err.response)
                      setPaymentStatus(
                        'Invalid card number or your card has expired'
                      )
                    })
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        })
    } catch (error) {
      setProcessing(false)
      setPaymentStatus('Invalid card number or your card has expired')
      console.log(error)
    }
  }

  if (data != undefined) {
    return (
      <div className="property-detail-screen">
        <div className="subject-image">
          <ImageSlider slides={images} index={handleIndex} />
        </div>
        <div className="wrapper">
          <h2>{`${data?.street} ${data?.houseNumber}, ${data?.zip} ${data?.city}`}</h2>
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
            {dates.length === 0 ? (
              <p className="calendar-alert-title">
                Select at least one day to make a booking
              </p>
            ) : (
              ''
            )}
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
                {`${data?.street} ${data?.houseNumber},`} <br />
                {`${data?.zip} ${data?.city} `} <br />
                {`${data?.province} ${data?.country} `}
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
            <button
              className={dates.length !== 0 ? 'main-btn' : 'main-btn disabled'}
              onClick={() => setShow(!show)}
            >
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
          <section className={show ? 'booking show' : 'booking hide'}>
            <h2>Complete your booking</h2>
            <form>
              <InputField
                name="name"
                onChange={handleChange}
                placeholder="Your complete name"
                type="text"
                className="main-input-field"
              />
              <InputField
                name="email"
                onChange={handleChange}
                placeholder="Your email"
                type="email"
                className="main-input-field"
                value={formData?.email ? formData?.email : user?.email}
              />
              <InputField
                name="city"
                onChange={handleChange}
                placeholder="City"
                type="text"
                className="main-input-field"
              />
              <InputField
                name="address"
                onChange={handleChange}
                placeholder="Street + housenumber"
                type="text"
                className="main-input-field"
              />
              <InputField
                name="zip"
                onChange={handleChange}
                placeholder="Postal code"
                type="number"
                className="main-input-field"
              />
              <CardElement options={cardElementOptions} />
              <h3>{paymentStatus}</h3>
              <button
                className="main-btn"
                onClick={(e) => handleReservation(e)}
              >
                {processing
                  ? 'Processing'
                  : 'Pay €' + dates?.length * data?.price}
              </button>
            </form>
            <button className="secondary-btn" onClick={() => setShow(!show)}>
              Review booking
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
