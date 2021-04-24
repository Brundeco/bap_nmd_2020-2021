import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'
import { Preloader } from '../../../components'
import { PropertyCard } from '../..'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()
  const [loading, setLoading] = useState(true)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then((res) => {
        console.log(res)
        res.data.favProperties?.map(async (el) => {
          setFavorites((prev) => [...prev, el])
        })
        const likes = res.data.favProperties
        axios
          .post(`${process.env.REACT_APP_API_URL}/properties/likes`, {
            likes: likes,
          })
          .then((res) => {
            setLoading(false)
            console.log(res)
            res.data.map((el) => setProperties((prev) => [...prev, el]))
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
      })
  }, [])

  useEffect(() => {
    // console.log(properties)
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
      <h2 className="main-title">Favorite properties</h2>
      {loading ? <Preloader text={preloaderMsg} /> : ''}
      {properties.map((item, key) => {
        console.log(item)
        return (
          <PropertyCard
            description={item.city}
            price={item.price}
            date={item.createdAt}
            // distance={
            //   distance?.find((el) => el.item === item._id)?.distance
            // }
            image={images[key]}
            authorId={item.author_id}
            itemId={item._id}
            key={key}
          />
        )
      })}
    </div>
  )
}
