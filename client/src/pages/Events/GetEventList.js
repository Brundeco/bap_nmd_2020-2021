import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, PrevPage, Header } from './../../components'
import { app } from '../../base'

export default () => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const user = JSON.parse(localStorage.getItem('user')).id

  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then((res) => {
        setData(res.data.events)
      })
      .catch((err) => {
        err.response.status === 401
          ? console.log(err.response.data.message)
          : console.log(err)
      })
  }, [])

  useEffect(() => {
    const promises = data
      ?.map(async (el) => {
        const url = await storageRef
          .child(el?.firebaseRef + '/' + el?.image)
          .getDownloadURL()
        return url
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="event-screen">
          <div className="wrapper">
            {data?.map(function (item, i) {
              console.log(item)
              return (
                <div key={i} className="list-item">
                  <h2> {item.title} </h2>
                  <div className="image">
                    <img src={images[i]} alt="" />
                  </div>
                  <Link to={{ pathname: `/event/${item._id}` }}>
                    <li>DETAIL</li>
                  </Link>
                  <Link to={{ pathname: `/update-event/${item._id}` }}>
                    <li>UPDATE</li>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text="events" />
      </React.Fragment>
    )
  }
}
