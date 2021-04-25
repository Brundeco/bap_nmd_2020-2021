import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
  const [alert, setAlert] = useState('No favorites could be found')

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
            setLoading(false)
            console.log(res.data)
            res.data.map((el) => setEvents((prev) => [...prev, el]))
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

  useEffect(() => {
    if (!favorites?.length > 0) {
      console.log('Less then 1 favorites')
    }
  }, [favorites])

  return (
    <div className="property-screen">
      <h2 className="main-title">Favorite events</h2>
      {loading ? <Preloader text={preloaderMsg} /> : ''}
      {favorites?.length > 0 ? (
        events.map((item, key) => {
          if (item) {
            return (
              <EventCard
                title={item.title}
                date={item.createdAt}
                // distance={
                //   distance?.find((el) => el.item === item._id)?.distance
                // }
                city={item.city}
                image={images[key]}
                itemId={item._id}
                key={key}
              />
            )
          }
        })
      ) : (
        <h2> It seems very empty here </h2>
      )}
    </div>
  )
}
