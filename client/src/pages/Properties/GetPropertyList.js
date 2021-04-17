import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CheckSession, InputField, Preloader } from '../../components'
import { app } from '../../base'
import Geocode from 'react-geocode'
import { getPreciseDistance } from 'geolib'
import {
  filterPriceDesc,
  filterPriceAsc,
  filterDistance,
  filterRecent,
  filterPriceRange,
} from './FilterProperties'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY)
  Geocode.enableDebug()

  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [locationSharing, setLocationSharing] = useState()
  const [coords, setCoords] = useState([])
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  const [distance, setDistance] = useState([])
  const [filterMode, setFilterMode] = useState('recent')
  const [priceRange, setPriceRange] = useState()
  const [togglePriceRange, setTogglePriceRange] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    setLocationSharing(props.locationsharing)
  }, [props.locationsharing])

  const handleChange = (name, value) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    async (e) => {
      if (filterMode === 'priceasc') {
        const propsFiltered = await filterPriceAsc()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'pricedesc') {
        const propsFiltered = await filterPriceDesc()
        setPropertiesFiltered(propsFiltered)
      }

      if (filterMode === 'newest') {
        const propsFiltered = await filterPriceDesc()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'oldest') {
        const propsFiltered = await filterPriceAsc()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'pricerange') {
        const propsFiltered = await filterPriceRange(priceRange)
        // setPropertiesFiltered(propsFiltered)
      }
    },
    [filterMode, togglePriceRange]
  )

  // Create seperate function for range filtering because form behaviour needs be changed to preventDefault()
  // Create a rangeToggle state to be able to call function multiple times (since setFilterMode's value will not change)
  const filterByPriceRange = (e) => {
    e.preventDefault()
    setTogglePriceRange(!togglePriceRange)
    setFilterMode('pricerange')
  }

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
              let distance = `${parseFloat(dis / 1000).toFixed(1)}`
              if (distance !== NaN)
                setDistance((prev) => [
                  ...prev,
                  `${parseFloat(dis / 1000).toFixed(1)}`,
                ])
              return dis / 1000 <= props.radius ? el : []
            })
          )
          setPropertiesFiltered(evts.flat())
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
    // console.log(distance)
  }, [distance])

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
        // console.log(newArray)
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  if (data != undefined) {
    return (
      <div className="property-screen">
        <button onClick={() => setFilterMode('newest')}>Newest</button>
        <button onClick={() => setFilterMode('oldest')}>Oldest</button>
        <button onClick={() => setFilterMode('priceasc')}>
          Price Ascending
        </button>
        <button onClick={() => setFilterMode('pricedesc')}>
          Price Descending
        </button>
        <form>
          <InputField
            name="minVal"
            placeholder="Minimum price"
            type="number"
            onChange={handleChange}
            className="main-input-field"
            required
          />
          <InputField
            name="maxVal"
            placeholder="Maximum price"
            type="number"
            onChange={handleChange}
            className="main-input-field"
            required
          />

          <button onClick={(e) => filterByPriceRange(e)}>
            Filter by price range
          </button>
        </form>
        <div className="wrapper">
          {propertiesFiltered?.map(function (item, i) {
            return (
              <div key={i} className="list-item">
                <h2> {item.description}</h2>
                <h4>PRICE: {item.price} </h4>
                <h4> Date: {new Date(item.createdAt).toDateString()} </h4>
                {/* <div className="image">
                  {images?.map(function (image, i) {
                    if (image?.includes(item.images[0])) {
                      return <img key={i} src={image} alt="" />
                    }
                  })}
                </div> */}
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
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text={'properties'} />
      </React.Fragment>
    )
  }
}
