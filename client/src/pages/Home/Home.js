import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser, Map } from '../../components'
import { GetEventList } from '..'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const location = LocateUser()
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
    if (location.error == 'User denied Geolocation') setLocationSharing(false)
    setUserLat(location?.coordinates?.lat)
    setUserLon(location?.coordinates?.lng)
  }, [location.loaded])

  // useEffect(() => {
  //   console.log(markers)
  // }, [markers])

  return (
    <div>
      <Header />
      <div className="home-screen">
        <section className="event-section">
          <div className="cta-top">
            <h2>Events around you</h2>
            <button onClick={() => (window.location = '/events')}>
              Show all events
            </button>
          </div>
          {locationSharing ? (
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
            <h3>Enable geolocation for better use of the app</h3>
          )}
          {userLat && userLon ? (
            <Map lat={userLat} lon={userLon} coords={markers} />
          ) : (
            <Map lat={50.8503} lon={4.3517} coords={markers} />
          )}

          {/* <Map /> */}
          <GetEventList
            radius={optionsValue}
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
