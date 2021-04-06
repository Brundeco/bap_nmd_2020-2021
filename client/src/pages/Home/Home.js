import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList } from '..'
import axios from 'axios'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [error, setError] = useState()
  const [locationSharing, setLocationSharing] = useState()
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

  const handleLocationSharing = (share) => {
    // console.log(share)
    setLocationSharing(share)
  }

  return (
    <div>
      <Header />
      <LocateUser err={setError} locationsharing={handleLocationSharing} />
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
            <h3>Location sharing is disabled</h3>
          )}
          <GetEventList
            radius={optionsValue}
            error={error}
            locationsharing={locationSharing}
          />
        </section>
      </div>
    </div>
  )
}
