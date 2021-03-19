import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, Header } from './../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'

export default () => {
  CheckSession(localStorage.getItem('jwt'))

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY)
  Geocode.enableDebug()

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [evtsFiltered, setEvtsFiltered] = useState([])
  const [userLat, setUserLat] = useState(localStorage.getItem('userLat'))
  const [userLon, setUserLon] = useState(localStorage.getItem('userLon'))

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
    data?.forEach((el) => {
      Geocode.fromAddress(
        `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`
      )
        .then((res) => {
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
          if (dis / 1000 < 10) {
            // console.log(el)
            setEvtsFiltered((evtsFiltered) => [...evtsFiltered, el])
          }
        })
        .catch((err) => console.log(err))
    })
  }, [data, userLon, userLat])

  useEffect(() => {
    const promises = evtsFiltered
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
