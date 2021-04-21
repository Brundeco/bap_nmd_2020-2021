import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'
import { Preloader } from '../../../components'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [events, setEvents] = useState([])

  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then((res) => {
        res.data.favEvents?.map(async (el) => {
          setFavorites((prev) => [...prev, el])
        })
        const likes = res.data.favEvents
        axios
          .post(`${process.env.REACT_APP_API_URL}/events/likes`, {
            likes: likes,
          })
          .then((res) => {
            console.log(res.data)
            res.data.map((el) => setEvents((prev) => [...prev, el]))
          })
      })
  }, [])

  useEffect(() => {
    events?.map((item) => {
      if (item) {
        storageRef
          .child(item.firebaseRef + '/' + item.image)
          .getDownloadURL()
          .then((url) => {
            setImages((prev) => [...prev, url])
          })
          .catch((err) => console.log(err))
      }
    })
  }, [events])

  useEffect(() => {
    if (favorites?.length > 0) {
      console.log(favorites.length)
    } else {
      console.log('Less then 1 favorites')
    }
  }, [favorites])

  if (favorites?.length > 0) {
    return (
      <div className="property-screen">
        <div className="wrapper">
          {favorites.map((el, key) => {
            if (el) {
              return (
                <div key={key}>
                  <h2>{}</h2>
                  <p>{el.city} </p>
                  <img
                    src={images[key]}
                    alt=""
                    style={{ width: '30vw', height: '5vh' }}
                  />
                  <Link
                    className="main-btn"
                    to={{
                      pathname: `/property/${el._id}/${el.author_id}`,
                    }}
                  >
                    Visit
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text="Loading favorite events" />
      </React.Fragment>
    )
  }
}
