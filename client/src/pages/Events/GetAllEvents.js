import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Preloader, CheckSession, Map, ConvertDate } from '../../components'
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
      .get(`${process.env.REACT_APP_API_URL}/events`)
      .then((res) => {
        setData(res.data.events)
      })
      .catch((err) => console.log(err))
  }, [])

  if (data != undefined) {
    return (
      <React.Fragment>
        <div className="event-screen">
          <h3>Map</h3>
          {/* <Map lat={userLat} lon={userLon} coords={coords} /> */}
          <div className="event-list">
            {data?.map(function (item, i) {
              // console.log(item)
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
