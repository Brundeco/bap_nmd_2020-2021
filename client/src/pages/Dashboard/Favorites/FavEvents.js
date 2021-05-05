import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { app } from '../../../base'
import { Preloader } from '../../../components'
import { EventCard } from '../..'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [events, setEvents] = useState([])
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()
  const [loading, setLoading] = useState(true)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second')

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
            res.data.map((el) => setEvents((prev) => [...prev, el]))
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
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

  return (
    <React.Fragment>
      <h2 className="main-title">My favorite events</h2>
      {loading ? <Preloader text={preloaderMsg} /> : ''}
      {favorites?.length > 0 ? (
        events.map((item, key) => {
          if (item) {
            return (
              <EventCard
                title={item.title}
                date={item.createdAt}
                zip={item.zip}
                city={item.city}
                image={images[key]}
                itemId={item._id}
                key={key}
              />
            )
          }
        })
      ) : (
        <div className="alert-empty">
          <h2 className="semi-bold">No likes found</h2>
          <h4>Discover events by clicking the button below</h4>
          <button
            className="main-btn"
            onClick={() => (window.location = '/events')}
          >
            Discover
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
