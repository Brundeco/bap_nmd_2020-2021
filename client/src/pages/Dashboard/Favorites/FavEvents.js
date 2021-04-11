import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      .then(async (res) => {
        await res.data.favProperties?.map((el) => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/events/${el}`)
            .then((r) => {
              if (r.data) {
                setFavorites((prev) => [...prev, r.data])
                storageRef
                  .child(r.data.firebaseRef + '/' + r.data.image)
                  .getDownloadURL()
                  .then((url) => {
                    // console.log(url)
                    setImages((prev) => [...prev, url])
                  })
                  .catch((err) => console.log(err))
              }
            })
        })
      })
  }, [])

  useEffect(() => {
    // console.log(favorites)
  }, [favorites])

  if (favorites?.length > 0) {
    return (
      <div className="property-screen">
        <div className="wrapper">
          {favorites.map((el, key) => {
            if (el) {
              console.log(el)
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
        <h1>Looking for favorite events</h1>
      </React.Fragment>
    )
  }
}
