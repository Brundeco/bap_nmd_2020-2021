import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, Header } from './../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY)
  Geocode.enableDebug()

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [evtsFiltered, setEvtsFiltered] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLon, setUserLon] = useState()
  const [radius, setRadius] = useState(localStorage.getItem('radius'))

  // Store user's latitude & longitude in state. Status received as prop from Home Component
  useEffect(() => {
    // If statement to prevent useffect with Geocode to setState again and rerender events
    if (userLat == undefined || userLon == undefined) {
      setUserLat(localStorage.getItem('userLat'))
      setUserLon(localStorage.getItem('userLon'))
    }
  }, [props.status])

  // Fetch all events and store in state(data)
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

  // Filter events based on accessibility (nearby the user), store filtered events in state
  useEffect(async () => {
    const radius = localStorage.getItem('radius')
    // console.log(radius)
    try {
      const evts = await Promise.all(
        data.map(async (el) => {
          const res = await Geocode.fromAddress(
            `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`
          )

          let dis = getPreciseDistance(
            {
              latitude: parseFloat(res.results[0].geometry.location.lat),
              longitude: parseFloat(res.results[0].geometry.location.lng),
            },
            {
              latitude: parseFloat(userLat),
              longitude: parseFloat(userLon),
            }
          )
          return dis / 1000 <= props.radius ? el : []
        })
      )
      // console.log(evts.flat())
      setEvtsFiltered(evts.flat())
    } catch (err) {
      console.log(err)
    }
  }, [data, userLon, userLat, props.radius])

  // Fetch event images (Firebase Firestore) and store in state
  useEffect(() => {
    const arr = evtsFiltered.map((item) => {
      return storageRef
        .child(item?.firebaseRef + '/' + item?.image)
        .getDownloadURL()
    })
    Promise.all(arr)
      .then((urls) => {
        setImages(urls)
      })
      .catch((err) => console.log(err))
  }, [evtsFiltered])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="event-screen">
          <div className="wrapper">
            {evtsFiltered?.map(function (item, i) {
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
