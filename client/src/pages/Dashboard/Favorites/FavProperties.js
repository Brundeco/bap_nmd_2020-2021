import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
        res.data.favProperties?.map(async (el) => {
          setFavorites((prev) => [...prev, el])
        })
        const likes = res.data.favProperties
        axios
          .post(`${process.env.REACT_APP_API_URL}/properties/likes`, {
            likes: likes,
          })
          .then((res) => {
            console.log(res)
            res.data.map((el) => setProperties((prev) => [...prev, el]))
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
      })
  }, [])

  useEffect(() => {
    const promises = properties
      ?.map((element) => {
        return element?.images?.map(async (el) => {
          const url = await storageRef
            .child(element.firebaseRef + '/' + el)
            .getDownloadURL()
          return url
        })
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [properties])

  return (
    <div className="property-screen">
      {loading ? <Preloader text={preloaderMsg} /> : ''}

      {favorites?.length > 0 ? (
        properties.map((item, key) => {
          let propImg = ''
          {
            images?.map((image, i) => {
              if (image?.includes(item.images[0])) {
                propImg = image
              }
            })
          }
          return (
            <PropertyCard
              description={item.city}
              price={item.price}
              date={item.createdAt}
              surface={item.surface}
              image={propImg}
              authorId={item.author_id}
              itemId={item._id}
              key={key}
            />
          )
        })
      ) : (
        <div className="alert-empty">
          <h2 className="semi-bold">No likes found</h2>
          <h4>Discover properties by clicking the button below</h4>
          <button
            className="main-btn"
            onClick={() => (window.location = '/events')}
          >
            Discover
          </button>
        </div>
      )}
    </div>
  )
}
