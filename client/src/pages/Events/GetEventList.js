import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, Map, ConvertDate } from './../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'
import likeIcon from './../../icons/heart-full-blue.svg'

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
  const [locationSharing, setLocationSharing] = useState()
  const [coords, setCoords] = useState([])

  // Fetch all events and store in state(data)
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then((res) => {
        setData(res.data.events)
        console.log(props.locationsharing)
      })
      .catch((err) => {
        console.log(err)
        // err.response.status === 401
        //   ? console.log(err.response.data.message)
        //   : console.log(err)
      })
  }, [])

  useEffect(() => {
    setLocationSharing(props.locationsharing)
    if (userLat == undefined || userLon == undefined) {
      setUserLat(localStorage.getItem('userLat'))
      setUserLon(localStorage.getItem('userLon'))
    }
  }, [props.locationsharing])

  // Filter events based on accessibility (nearby the user), store filtered events in state
  useEffect(async () => {
    try {
      if (locationSharing) {
        const evts = await Promise.all(
          data.map(async (el) => {
            // console.log(el)
            const res = await Geocode.fromAddress(
              `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`
            )
            const coord = [
              res.results[0].geometry.location.lng,
              res.results[0].geometry.location.lat,
              `/event/${el._id}`,
            ]
            // const anchor = el.
            // if ((coords.length = 0)) setCoords((prev) => [...prev, coord])
            // console.log(data.length)
            if (coords.length !== data.length)
              setCoords((prev) => [...prev, coord])
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
            console.log(`${parseFloat(dis / 1000).toFixed(1)} km`)
            return dis / 1000 <= props.radius ? el : []
          })
        )
        setEvtsFiltered(evts.flat())
      } else {
        setEvtsFiltered(data)
      }
    } catch (err) {
      console.log(err)
    }
  }, [data, userLon, userLat, props.radius, locationSharing])

  // Fetch event images (Firebase Firestore) and store in state
  useEffect(() => {
    console.log(evtsFiltered)
    const arr = evtsFiltered?.map((item) => {
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
        <div className="event-screen">
          <h3>Map</h3>
          {/* <Map lat={userLat} lon={userLon} coords={coords} /> */}
          <div className="event-list">
            {evtsFiltered?.map(function (item, i) {
              return (
                <div key={i} className="event-featured">
                  <div className="image">
                    <img src={images[i]} alt="" />
                  </div>
                  <div className="info">
                    <div className="left">
                      <h3> {item.title} </h3>
                      <h4>
                        {`${item.city} ${new Date(
                          item.dates[0]
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })} `}
                      </h4>
                    </div>
                    <div className="right">
                      <div className="round-like-btn">
                        <img src={likeIcon} alt="" />
                      </div>
                    </div>
                  </div>
                  {/* <a href={`/event/${item._id}`}>Detail</a>
                  <a href={`/update-event/${item._id}`}>Update</a> */}
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
