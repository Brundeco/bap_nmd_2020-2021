import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, FilterEvents } from './../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'
import likeIcon from './../../icons/heart-full-blue.svg'
// import { filterPrice, filterDistance, filterRecent } from './FilterEvents'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY)
  Geocode.enableDebug()

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [evtsFiltered, setEvtsFiltered] = useState([])
  const [coords, setCoords] = useState([])
  const [locationSharing, setLocationSharing] = useState()

  // Fetch all events and store in state(data)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events`)
      .then((res) => {
        setData(res.data.events)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setLocationSharing(props.locationsharing)
  }, [props.locationsharing])

  // Filter events based on accessibility (nearby the user), store filtered events in state
  useEffect(async () => {
    if (locationSharing == true) {
      console.log('App is fully operational')
      if (data?.length > 1) {
        try {
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
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      console.log('App breaks because loc sharing is turned off ! !')
      if (data?.length > 1) {
        try {
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
        } catch (error) {
          console.log(error)
        }
      }
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

  const handleFilters = (data) => {
    // console.log(data)
    setEvtsFiltered(data)
  }

  if (data == undefined || data.length <= 1) {
    return <Preloader text="events" />
  } else {
    return (
      <div className="event-screen" markers={props.markers(coords)}>
        <div className="event-list">
          {props.showfilters ? (
            <FilterEvents filtereddata={handleFilters} />
          ) : (
            ''
          )}
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
                  <h4> Date: {new Date(item.createdAt).toDateString()} </h4>

                  {/* <div className="image">
                    <img src={images[i]} alt="" />
                  </div> */}
                  <div className="info">
                    <div className="left">
                      <h3> {item.title} </h3>
                      {/* <h4>
                        {`${item.city} ${new Date(
                          item.dates[0]
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })} `}
                      </h4> */}
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
    )
  }
}
