import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Preloader, CheckSession } from './../../components'
import { app } from '../../base'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [image, setImage] = useState()
  const [timestamp, setTimestamp] = useState('Loading...')
  const [favorites, setFavorites] = useState([])
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(data)
    const timestamp = data?.createdAt
    if (timestamp) {
      const timestampToString = Date(timestamp).toString()
      setTimestamp(timestampToString)
    }

    if (data?.firebaseRef !== undefined && data?.image !== undefined)
      storageRef
        .child(data?.firebaseRef + '/' + data?.image)
        .getDownloadURL()
        .then((url) => setImage(url))
        .catch((err) => console.log(err))

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then((res) => {
        setFavorites(res.data.favEvents)
      })
      .catch((err) => console.log(err))
  }, [data])

  const handleClick = async (e) => {
    e.preventDefault()

    // console.log(favorites)
    let arr = [...favorites]
    // console.log(arr)
    // console.log(match.params.id)
    let indexItem = arr.indexOf(match.params.id)
    // console.log(indexItem)
    indexItem === -1 ? arr.push(match.params.id) : arr.splice(indexItem, 1)
    // console.log(arr)

    axios
      .put(`${process.env.REACT_APP_API_URL}/users/like/${user.id}`, {
        favEvents: arr,
      })
      .then((res) => {
        const favs = res.data.favEvents
        setData((prev) => ({ ...prev, favEvents: favs }))
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    favorites.includes(match.params.id) ? setLiked(false) : setLiked(true)
  }, [favorites])

  if (data != undefined) {
    return (
      <div>
        <div className="event-screen">
          <div className="subject-image">
            <img src={image} alt="" />
          </div>
          <div className="wrapper">
            <h1>{data?.title}</h1>
            <h2>By Leda Lenskens | {timestamp} </h2>
            <p> {data?.description}</p>
            <div>
              <h3>Practical</h3>
            </div>
            <section className="cta-section">
              <button
                className={
                  liked ? 'main-btn liked-event' : 'main-btn not-liked-event'
                }
                onClick={(e) => handleClick(e)}
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
