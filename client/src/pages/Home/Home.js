import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser, Map } from '../../components'
import { GetEventList } from '..'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const location = LocateUser()
  const [error, setError] = useState()
  const [locationSharing, setLocationSharing] = useState(true)
  const [markers, setMarkers] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLon, setUserLon] = useState()
  const [optionsValue, setOptionsValue] = useState(
    localStorage.getItem('radius') || 5
  )
  const options = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '15 km', value: 15 },
    { label: '30 km', value: 30 },
    { label: 'everywhere', value: 100000 },
  ]

  useEffect(() => {
    setUserLat(location?.coordinates?.lat)
    setUserLon(location?.coordinates?.lng)
    // console.log(location.error)
    if (location.error == 'User denied Geolocation') {
      setLocationSharing(false)
    }
  }, [location.loaded])

  useEffect(() => {
    // console.log(location.error)
  }, [location])

  useEffect(() => {
    // console.log(userLat)
    // console.log(userLon)
  }, [userLon, userLat])

  return (
    <div>
      <Header />
      {/* <LocateUser err={setError} locationsharing={handleLocationSharing} /> */}
      <div className="home-screen">
        <section className="event-section">
          <div className="cta-top">
            <h2>Events around you</h2>
            <button onClick={() => (window.location = '/events')}>
              Show all events
            </button>
          </div>
          {location.loaded
            ? JSON.stringify(location)
            : 'Location data not available yet'}
          {/* 
          {location.loaded
            ? JSON.stringify(location)
            : 'Location data not available yet'} */}

          {location.loaded ? (
            <React.Fragment>
              <label>Select radius</label>
              <select
                value={optionsValue}
                onChange={(e) => {
                  setOptionsValue(e.currentTarget.value)
                  localStorage.setItem('radius', e.currentTarget.value)
                }}
              >
                {options.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </React.Fragment>
          ) : (
            <h3>Location sharing is not available yet</h3>
          )}
          {/* <Map lat={userLat} lon={userLon} coords={markers} /> */}
          <GetEventList
            radius={optionsValue}
            error={error}
            locationsharing={locationSharing}
            markers={(coords) => setMarkers(coords)}
            lat={userLat}
            lng={userLon}
          />
        </section>
      </div>
    </div>
  )
}
