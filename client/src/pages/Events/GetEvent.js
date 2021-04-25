import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import NoUserIcon from './../../icons/no-user.svg'
import CloseIcon from './../../icons/close.svg'
import { Preloader, CheckSession, ConvertDate } from './../../components'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { app } from '../../base'

export default ({ match }) => {
  // CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  let history = useHistory()
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [image, setImage] = useState()
  const [authorImage, setAuthorImage] = useState()
  const [favorites, setFavorites] = useState([])
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dates, setDates] = useState([])
  const [eventStartDate, setEventStartDate] = useState()
  const [convertedDate, setConvertedDate] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
        axios
          .get(`${process.env.REACT_APP_API_URL}/users/${res.data.author_id}`)
          .then((r) => {
            if (r.data.image) setAuthorImage(r.data.image)
          })
      })
  }, [])

  useEffect(() => {
    data?.dates.map((el) => setDates((prev) => [...prev, new Date(el)]))

    const orderedDates = data?.dates.sort((a, b) => {
      return Date.parse(a) - Date.parse(b)
    })
    setEventStartDate(new Date(orderedDates?.[0]).getTime())

    user &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/${user?.id}`)
        .then((res) => {
          setFavorites(res.data.favEvents)
        })
        .catch((err) => console.log(err))

    if (data?.firebaseRef !== undefined && data?.image !== undefined)
      storageRef
        .child(data?.firebaseRef + '/' + data?.image)
        .getDownloadURL()
        .then((url) => {
          setImage(url)
          setLoading(false)
        })
        .catch((err) => console.log(err))
  }, [data])

  useEffect(() => {
    if (eventStartDate) {
      const convDate = ConvertDate(eventStartDate)
      setConvertedDate(convDate)
    }
  }, [eventStartDate])

  const handleLike = async (e) => {
    e.preventDefault()
    setLoading(true)

    let arr = [...favorites]
    let indexItem = arr.indexOf(match.params.id)
    indexItem === -1 ? arr.push(match.params.id) : arr.splice(indexItem, 1)

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/like-event/${user?.id}`, {
        favEvents: arr,
      })
      .then((res) => {
        const favs = res.data.favEvents
        setFavorites(favs)
        setData((prev) => ({ ...prev, favEvents: favs }))
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    favorites?.includes(match.params.id) ? setLiked(false) : setLiked(true)
  }, [favorites])

  if (data != undefined) {
    return (
      <div className="event-screen-detail">
        {loading ? <Preloader text="Loading" /> : ''}
        <button className="close-btn" onClick={() => history.goBack()}>
          <img src={CloseIcon} alt="close button" />
        </button>
        <div className="subject-image">
          <img src={image} alt="" />
        </div>
        <section className="top-section">
          <h1 className="event-title main-title">{data?.title}</h1>
          <div className="author-info flex flex-j-between">
            <div className="flex flex-a-center">
              <img
                src={authorImage ? authorImage : NoUserIcon}
                alt="authorimage"
                className="authorimage"
              />
              <p className="semi-bold">{data?.author}</p>
            </div>
            <div className="flex flex-j-end flex-a-center">
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

          <h3 className="small-title-italic">
            Created at {ConvertDate(data?.createdAt)}
          </h3>
          <p> {data?.description}</p>
        </section>

        <section className="bottom-section">
          <h2 className="main-title">Practical</h2>
          <p>{convertedDate}</p>
          <p>
            From
            {`${data?.startHrs}:${data?.startMins}hr till ${data?.endHrs}:${data?.endMins}`}
          </p>
          <p>{`${data?.street} ${data?.houseNumber}, ${data?.zip} ${data?.city}`}</p>
          {/* <ul>
            <li>{convertedDate} </li>
            <li>
              From
              {`${data?.startHrs}:${data?.startMins}hr till ${data?.endHrs}:${data?.endMins}`}
            </li>
            <li>
              {`${data?.street} ${data?.houseNumber}, ${data?.zip} ${data?.city}`}
            </li>
          </ul> */}
        </section>
        <section>
          <DayPicker
            selectedDays={dates}
            disabledDays={{ before: new Date() }}
          />
        </section>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text={'Loading event'} />
      </React.Fragment>
    )
  }
}
