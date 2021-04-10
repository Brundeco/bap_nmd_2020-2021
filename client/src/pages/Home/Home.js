import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser, Map, Menu } from '../../components'
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
            <button onClick={() => (window.location = '/events')}>
              Show all events
            </button>
          </div>
          <GetEventList
            radius={radius}
            locationsharing={locationSharing}
            markers={() => {}}
            lat={userLat}
            lng={userLon}
          />
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
