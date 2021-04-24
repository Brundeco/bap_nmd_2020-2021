import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Preloader, CheckSession, FilterEvents } from './../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'
import { EventCard } from '..'

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
  const [distance, setDistance] = useState([])
  const [loading, setLoading] = useState(true)

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
      console.log('Location sharing TRUE')
      if (data?.length > 1) {
        try {
          const evts = await Promise.all(
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
              setDistance((prev) => [
                ...prev,
                {
                  item: el._id,
                  distance: parseFloat(dis / 1000).toFixed(1),
                },
              ])
              return dis / 1000 <= props.radius ? el : []
            })
          )
          setEvtsFiltered(evts.flat())
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      console.log('Location sharing FALSE')
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
  useEffect(async () => {
    if (evtsFiltered) {
      const arr = evtsFiltered?.map((item) => {
        return storageRef
          .child(item?.firebaseRef + '/' + item?.image)
          .getDownloadURL()
      })
      await Promise.all(arr)
        .then((urls) => {
          setImages(urls)
        })
        .catch((err) => console.log(err))
    }
  }, [evtsFiltered])

  const handleFilters = (data) => {
    setEvtsFiltered(data)
  }

  return (
    <div className="event-list" markers={props.markers(coords)}>
      {loading ? <Preloader text="Searching around you" /> : ''}
      {props.showfilters ? <FilterEvents filtereddata={handleFilters} /> : ''}
      {evtsFiltered?.map((item, index) => {
        return (
          <React.Fragment>
            <EventCard
              title={item.title}
              date={item.createdAt}
              distance={distance?.find((el) => el.item === item._id)?.distance}
              city={item.city}
              image={images[index]}
              itemId={item._id}
              key={index}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}
