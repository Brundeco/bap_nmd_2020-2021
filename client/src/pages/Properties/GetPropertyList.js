import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckSession, FilterProperties, Preloader } from '../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'
import { PropertyCard } from '..'

export default (props) => {

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY)
  Geocode.enableDebug()

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [locationSharing, setLocationSharing] = useState()
  const [coords, setCoords] = useState([])
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  const [distance, setDistance] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    setLocationSharing(props.locationsharing)
  }, [props.locationsharing])

  useEffect(async () => {
    if (locationSharing == true) {
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
          setPropertiesFiltered(evts.flat())
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      if (data?.length > 1) {
        try {
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
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [data, props.lat, props.lng, props.radius])

  useEffect(() => {
    const promises = data
      ?.map((element) => {
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
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  const handleFilters = (data) => {
    setPropertiesFiltered(data)
  }

  useEffect(() => {
    console.log(props.showfilters)
  }, [props.showfilters])

  return (
    <div className="property-list">
      {loading ? <Preloader text="Searching around you" /> : ''}
      {props.showfilters ? (
        <FilterProperties filtereddata={handleFilters} />
      ) : (
        ''
      )}
      {propertiesFiltered?.map((item, index) => {
        let propImg = ''
        {
          images?.map((image, i) => {
            if (image?.includes(item.images[0])) {
              propImg = image
            }
          })
        }
        return (
          <PropertyCard
            surface={item.surface}
            price={item.price}
            date={item.createdAt}
            distance={distance?.find((el) => el.item === item._id)?.distance}
            image={propImg}
            authorId={item.author_id}
            itemId={item._id}
            key={index}
          />
        )
      })}
    </div>
  )
}
