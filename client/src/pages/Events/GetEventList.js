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
  const [coords, setCoords] = useState([])

  // Fetch all events and store in state(data)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events`)
      .then((res) => {
        setData(res.data.events)
      })
      .catch((err) => console.log(err))
  }, [])

  // useEffect(() => {
  //   console.log(props.locationsharing)
  // }, [props.locationsharing])

  // Filter events based on accessibility (nearby the user), store filtered events in state

  useEffect(async () => {
    try {
      if (props.locationsharing) {
        if (data && data.length > 1) {
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
                el.title,
                `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`,
              ]
              if (coords.length !== data.length)
                setCoords((prev) => [...prev, coord])
              let dis = getPreciseDistance(
                {
                  latitude: parseFloat(res.results[0].geometry.location.lat),
                  longitude: parseFloat(res.results[0].geometry.location.lng),
                },
                {
                  latitude: parseFloat(props.lat),
                  longitude: parseFloat(props.lng),
                }
              )
              // console.log(`${parseFloat(dis / 1000).toFixed(1)} km`)
              return dis / 1000 <= props.radius ? el : []
            })
          )
          setEvtsFiltered(evts.flat())
        }
      } else {
        setEvtsFiltered(data)
        data.map(async (el) => {
          const res = await Geocode.fromAddress(
            `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`
          )
          const coord = [
            res.results[0].geometry.location.lng,
            res.results[0].geometry.location.lat,
            `/event/${el._id}`,
            el.title,
            `${el.street} ${el.houseNumber}, ${el.zip} ${el.city}`,
          ]
          if (coords.length !== data.length)
            setCoords((prev) => [...prev, coord])
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [data, props.lat, props.lng, props.radius])

  // Fetch event images (Firebase Firestore) and store in state
  useEffect(() => {
    if (evtsFiltered) {
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
    }
  }, [evtsFiltered])

  if (data != undefined) {
    return (
      <React.Fragment>
        <div className="event-screen" markers={props.markers(coords)}>
          <div className="event-list">
            {evtsFiltered?.map(function (item, i) {
              return (
                <Link
                  className="event-featured"
                  key={i}
                  to={{
                    pathname: `/event/${item._id}`,
                    state: { from: 'root' },
                  }}
                >
                  <div>
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
                  </div>
                </Link>
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
