import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'
import { Preloader } from '../../../components'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()
  const [loading, setLoading] = useState(true)
  const [preloaderMsg, setPreloaderMsg] = useState(
    'Loading favorite properties'
  )

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then((res) => {
        res.data.favProperties?.map(async (el) => {
          setFavorites((prev) => [...prev, el])
        })
        const likes = res.data.favProperties
        axios
          .post(`${process.env.REACT_APP_API_URL}/properties/likes`, {
            likes: likes,
          })
          .then((res) => {
            console.log(res.data)
            res.data.map((el) => setProperties((prev) => [...prev, el]))
            setLoading(false)
          })
      })
  }, [])

  useEffect(() => {
    properties?.map((item) => {
      if (item) {
        storageRef
          .child(item.firebaseRef + '/' + item.images[0])
          .getDownloadURL()
          .then((url) => {
            setImages((prev) => [...prev, url])
          })
          .catch((err) => console.log(err))
      }
    })
  }, [properties])

  return (
    <div className="property-screen">
      <div className="wrapper">
        {loading ? <Preloader text={preloaderMsg} /> : ''}
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
}
