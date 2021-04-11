import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [favorites, setFavorites] = useState([])
  const [properties, setProperties] = useState([])
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()

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
          .then((res) =>
            res.data.map((el) => setProperties((prev) => [...prev, el]))
          )
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

  useEffect(() => {
    console.log(images)
  }, [images])

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
  //     .then((res) => {
  //       console.log(res)
  //       res.data.favProperties?.map(async (el) => {
  //         setFavorites((prev) => [...prev, el])
  //         console.log(el)
  //         await axios
  //           .get(`${process.env.REACT_APP_API_URL}/properties/${el}`)
  //           .then((r) => {
  //             if (r.data) {
  //               console.log(r.data)
  //               setFavorites((prev) => [...prev, r.data])
  //               storageRef
  //                 .child(r.data.firebaseRef + '/' + r.data.images[0])
  //                 .getDownloadURL()
  //                 .then((url) => {
  //                   console.log(url)
  //                   setImages((prev) => [...prev, url])
  //                 })
  //                 .catch((err) => console.log(err))
  //             }
  //           })
  //       })
  //     })
  // }, [])

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
        <h1>Looking for favorite properties</h1>
      </React.Fragment>
    )
  }
}
