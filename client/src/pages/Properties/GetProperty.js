import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import CloseIcon from './../../icons/new-close.svg'
import NoUserIcon from './../../icons/no-user.svg'
import { Preloader, ConvertDate, InputField } from '../../components'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { app } from '../../base'
import PriceIcon from './../../icons/property-detail/price.svg'
import SurfaceIcon from './../../icons/property-detail/surface.svg'
import CalenderIcon from './../../icons/property-detail/calendar.svg'
import ContactIcon from './../../icons/property-detail/contact.svg'
import AddressIcon from './../../icons/property-detail/address.svg'
import AreasIcon from './../../icons/property-detail/diagram.svg'
import Swiper from './../../components/Swiper'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default ({ match }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  let history = useHistory()
  const [propertyCreatedAt, setPropertyCreatedAt] = useState()
  const [data, setData] = useState()
  const [images, setImages] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [dates, setDates] = useState([])
  const storageRef = app.storage().ref()
  const [showCalendar, setShowCalendar] = useState(false)
  const [conversationId, setConversationId] = useState()
  const [formData, setFormData] = useState()
  const [show, setShow] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState()
  const [favorites, setFavorites] = useState([])
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formValid, setFormValid] = useState(false)
  const [booking, setBooking] = useState({
    client: user?.username,
    client_id: user?.id,
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

    user &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user?.id}`)
        .then((res) => {
          setFavorites(res?.data?.favProperties)
          setLoading(false)
        })
  }, [])

  useEffect(() => {
    selectedDates?.length > 0 ? setFormValid(true) : setFormValid(false)
  }, [selectedDates])

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

    user &&
      axios
        .post(`${process.env.REACT_APP_API_URL}/messages/conversation_id`, {
          from: user?.id,
          to: data?.author_id,
        })
        .then((res) => setConversationId(res.data))
        .catch((err) => console.log(err))

    if (!user) setLoading(false)
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

  const handleLike = async (e) => {
    e.preventDefault()
    setLoading(true)

    let arr = [...favorites]
    let indexItem = arr.indexOf(match.params.id)
    indexItem === -1 ? arr.push(match.params.id) : arr.splice(indexItem, 1)

    user &&
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/users/like-property/${user?.id}`,
          {
            favProperties: arr,
          }
        )
        .then((res) => {
          const favs = res.data.favProperties
          setFavorites(favs)
          setData((prev) => ({ ...prev, favProperties: favs }))
          setLoading(false)
        })
        .catch((err) => console.log(err))
  }

  useEffect(() => {
    favorites?.includes(match.params.id) ? setLiked(false) : setLiked(true)
  }, [favorites])

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
              firebase_ref: data.firebaseRef,
              property_owner_id: data.author_id,
              property_owner_firstname: data.firstname,
              property_owner_lastname: data.lastname,
              property_owner_email: data.email,
              property_owner_phone: data.phone,
              property_id: data._id,
              image: data.images[0],
              property_address: `${data.street} ${data.houseNumber}, ${data.zip} ${data.city}`,
              client_id: user?.id,
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
                      user: user?.username,
                      user_id: user?.id,
                      price: data.price * dates.length,
                      firstname: data.firstname,
                      lastname: data.lastname,
                      email: data.email,
                      receiver: user?.email,
                    })
                    .then((res) => {
                      console.log(res.data.message)
                      window.location = `/reservations`
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
    }
  }

  if (data != undefined) {
    return (
      <div className="property-detail-screen">
        {loading ? <Preloader text="Just a second please" /> : ''}

        <button className="close-btn" onClick={() => history.goBack()}>
          <img src={CloseIcon} alt="close button" />
        </button>
        {/* <Link
          className="close-btn"
          to={{ pathname: '/properties', state: { from: 'root' } }}
        >
          <img src={CloseIcon} alt="close button" />
        </Link> */}
        <Swiper slides={images} />

        <section>
          <h2 className="main-title">{`${data?.street} ${data?.houseNumber}, ${data?.zip} ${data?.city}`}</h2>
          <div className="cta-section-top">
            <div className="left">
              <img src={NoUserIcon} alt="" />
              <p> {`${data?.firstname} ${data?.lastname}`} </p>
            </div>
            <div className="right">
              {user && (
                <button
                  className={liked ? 'main-btn' : 'secondary-btn'}
                  onClick={(e) => handleLike(e)}
                >
                  {liked ? 'Like' : 'Unlike'}
                </button>
              )}
            </div>
          </div>
          <h3>Added on {propertyCreatedAt}</h3>
        </section>

        <section>
          <p className="description"> {data?.description}</p>
        </section>

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
              <img src={AreasIcon} alt="" />
            </div>
            <div className="center">
              <h4>Areas</h4>
              <p>Number of seperate rooms</p>
            </div>
            <div className="right">
              <p> {data?.areas} </p>
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

        <section>
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
        </section>

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

        {!user ? (
          <section className="disable-cta">
            <p>
              To chat or make a reservation you need to be
              <Link
                className="menu-link-extra"
                to={{ pathname: '/login', state: { from: 'root' } }}
              >
                logged in
              </Link>
            </p>
          </section>
        ) : user.id === match.params.author_id ? (
          <section className="disable-cta">
            <p>
              Chat and booking options are disabled since you own this property
            </p>
          </section>
        ) : (
          <section className="cta-bottom-section">
            <button
              className={formValid ? 'main-btn' : 'main-btn disabled-btn'}
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
        )}

        <section className={show ? 'booking show' : 'booking hide'}>
          <h2 className="main-title">Complete your booking</h2>
          <form>
            <InputField
              name="name"
              onChange={handleChange}
              placeholder="Your complete name"
              type="text"
              className="main-input-field"
              value={
                formData?.email
                  ? formData?.email
                  : `${user?.firstname} ${user?.lastname}`
              }
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
            <button className="main-btn" onClick={(e) => handleReservation(e)}>
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
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text="Loading property" />
      </React.Fragment>
    )
  }
}
