import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, LocateUser } from '../../components'
import { GetEventList, GetPropertyList } from '..'

export default (props) => {
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

  return (
    <div>
      <Header
        locationsharing={locationSharing}
        radius={handleRadius}
        showfilters={() => {}}
      />
      <div className="home-screen">
        <section className="expand">
          <div className="cta">
            <h2 className="main-title">Events around you</h2>
            <Link
              className="secondary-btn"
              to={{
                pathname: '/events',
              }}
            >
              <li>Show all</li>
            </Link>
          </div>
          <GetEventList
            radius={radius}
            locationsharing={locationSharing}
            markers={() => {}}
            lat={userLat}
            lng={userLon}
            showfilters={false}
          />
        </section>
        <section className="expand">
          <div className="cta">
            <h2 className="main-title">Properties around you</h2>
            <Link
              className="secondary-btn"
              to={{
                pathname: '/properties',
              }}
            >
              <li>Show all</li>
            </Link>
          </div>
          <GetPropertyList
            radius={radius}
            locationsharing={locationSharing}
            markers={() => {}}
            lat={userLat}
            lng={userLon}
            showfilters={false}
          />
        </section>
      </div>
    </div>
  )
}
