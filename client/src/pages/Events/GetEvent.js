import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Preloader, CheckSession, PrevPage } from './../../components'
import { app } from '../../base'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [image, setImage] = useState()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${match.params.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(data)
    const timestamp = data?.createdAt
    if (timestamp) {
      console.log(timestamp.toString())
      const timestampToString = Date(timestamp).toString()
      console.log(timestampToString)
    }

    storageRef
      .child(data?.firebaseRef + '/' + data?.image)
      .getDownloadURL()
      .then((url) => setImage(url))
  }, [data])

  if (data != undefined) {
    return (
      <div>
        <div className="event-screen">
          <div className="subject-image">
            <img src={image} alt="" />
          </div>
          <div className="wrapper">
            <PrevPage />
            <h1>{data?.title}</h1>
            <h2>By Leda Lenskens | created on 16 feb, 2021</h2>
            <p> {data?.description}</p>
            <div>
              <h3>Practical</h3>
            </div>
            <section className="cta-section">
              <button className="main-btn">Button</button>
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
