import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList, GetPropertyList } from '..'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))
  const location = LocateUser()
  const [locationSharing, setLocationSharing] = useState(true)
  const [userLat, setUserLat] = useState()
  const [userLon, setUserLon] = useState()
  const [radius, setRadius] = useState()

  useEffect(async () => {
    if (location.error == 'User denied Geolocation') {
      setLocationSharing(false)
      localStorage.setItem('locationsharing', false)
      localStorage.removeItem('userlat')
      localStorage.removeItem('userlng')
    } else {
      setUserLat(location?.coordinates?.lat)
      setUserLon(location?.coordinates?.lng)
      if (
        !localStorage.getItem('userlat') ||
        !localStorage.getItem('userlng') ||
        !localStorage.getItem('locationsharing')
      ) {
        localStorage.setItem('locationsharing', true)
        localStorage.setItem('userlat', location?.coordinates?.lat)
        localStorage.setItem('userlng', location?.coordinates?.lng)
      }
    }
  }, [location.loaded])

  const handleRadius = (radius) => {
    setRadius(radius)
  }

  useEffect(() => {
    // console.log(locationSharing)
  }, [locationSharing])

  return (
    <div>
      <Header locationsharing={locationSharing} radius={handleRadius} />
      <div className="home-screen">
        <section className="event-section">
          <div className="cta-top">
            <h2>Events around you</h2>
            <Link
              to={{
                pathname: '/events',
              }}
            >
              <li>Show all events</li>
            </Link>
          </div>
          <GetEventList
            radius={radius}
            locationsharing={locationSharing}
            markers={() => {}}
            lat={userLat}
            lng={userLon}
          />
          <div className="cta-top">
            <h2>Properties around you</h2>
            <Link
              to={{
                pathname: '/properties',
              }}
            >
              <li>Show all properties</li>
            </Link>
          </div>
          <GetPropertyList
            radius={radius}
            locationsharing={locationSharing}
            markers={() => {}}
            lat={userLat}
            lng={userLon}
          />
        </section>
      </div>
    </div>
  )
}
