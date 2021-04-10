import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CheckSession, Header, Preloader } from '../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [locationSharing, setLocationSharing] = useState()
  const [coords, setCoords] = useState([])
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  useEffect(() => {
    console.log(props.locationsharing)
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(props.locationsharing)
    setLocationSharing(props.locationsharing)
  }, [props.locationsharing])

  useEffect(async () => {
    try {
      if (locationSharing == true) {
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
          setPropertiesFiltered(evts.flat())
        }
      } else {
        setPropertiesFiltered(data)
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

  useEffect(() => {
    console.log(data)
    const promises = data
      ?.map((element) => {
        console.log(element)
        return element?.images?.map(async (el) => {
          const url = await storageRef
            .child(element.firebaseRef + '/' + el)
            .getDownloadURL()
          return url
        })
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        console.log(newArray)
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  if (data != undefined) {
    console.log('Waar zijn we ?????? !!!!!!')
    return (
      <React.Fragment>
        <div className="property-screen">
          <div className="wrapper">
            {propertiesFiltered?.map(function (item, i) {
              console.log(item)
              return (
                <div key={i} className="list-item">
                  <h2> {item.description}</h2>
                  <div className="image">
                    {images?.map(function (image, i) {
                      if (image?.includes(item.images[0])) {
                        return <img src={image} alt="" />
                      }
                    })}
                  </div>
                  <ul>
                    <Link
                      to={{
                        pathname: `/property/${item._id}/${item.author_id}`,
                      }}
                    >
                      <li>DETAIL</li>
                    </Link>
                  </ul>
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
        <Preloader text={'properties'} />
      </React.Fragment>
    )
  }
}
