import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NoUserIcon from './../../icons/no-user.svg'
import {
  Preloader,
  CheckSession,
  ConvertDate,
  PreloaderSpinningWheel,
} from './../../components'
import { app } from '../../base'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [image, setImage] = useState()
  const [authorImage, setAuthorImage] = useState()
  const [favorites, setFavorites] = useState([])
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`)
      .then((res) => {
        setData(res.data)
        axios
          .get(`${process.env.REACT_APP_API_URL}/users/${res.data.author_id}`)
          .then((r) => {
            if (r.data.image) setAuthorImage(r.data.image)
          })
      })
  }, [])

  useEffect(() => {
    console.log(data)
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then((res) => {
        console.log(res)
        setFavorites(res.data.favEvents)
      })
      .catch((err) => console.log(err))

    if (data?.firebaseRef !== undefined && data?.image !== undefined)
      storageRef
        .child(data?.firebaseRef + '/' + data?.image)
        .getDownloadURL()
        .then((url) => setImage(url))
        .catch((err) => console.log(err))
  }, [data])

  const handleLike = async (e) => {
    e.preventDefault()
    setLoading(true)

    let arr = [...favorites]
    let indexItem = arr.indexOf(match.params.id)
    indexItem === -1 ? arr.push(match.params.id) : arr.splice(indexItem, 1)

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/like-event/${user.id}`, {
        favEvents: arr,
      })
      .then((res) => {
        const favs = res
        console.log(favs)
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
      <div>
        <div className="event-screen">
          {loading ? <Preloader text="Just a second please" /> : ''}
          <div className="subject-image">
            <img src={image} alt="" />
          </div>
          <div className="wrapper">
            <h1>{data?.title}</h1>
            <h2>
              <img
                src={authorImage ? authorImage : NoUserIcon}
                alt="authorimage"
                className="authorimage"
              />
              <Link to={{ pathname: '/', state: { from: 'root' } }}>
                {data?.author}
              </Link>
            </h2>
            <h3>Created at {ConvertDate(data?.createdAt)}</h3>
            <p> {data?.description}</p>
            <div>
              <h3>Practical</h3>
            </div>
            <section className="cta-section">
              <button
                className={
                  liked ? 'main-btn liked-event' : 'main-btn not-liked-event'
                }
                onClick={(e) => handleLike(e)}
              >
                {liked ? 'Like' : 'Unlike'}
              </button>
            </section>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader />
      </React.Fragment>
    )
  }
}
