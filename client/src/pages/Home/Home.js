import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList } from '..'
import axios from 'axios'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [status, setStatus] = useState()
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

  const handleStatus = (status) => {
    setStatus(status)
  }

  const handleLocationSharing = (userLoc) => {
    setLocationSharing(userLoc)
  }

  return (
    <div>
      <Header />
      <LocateUser
        err={setError}
        status={handleStatus}
        locationsharing={handleLocationSharing}
      />
      <div className="home-screen">
        <section className="event-section">
          <h2>Events around you</h2>
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

          <div className="event-list">
            <GetEventList
              status={status}
              radius={optionsValue}
              error={error}
              locationsharing={locationSharing}
            />
          </div>
        </section>

        <button
          className="main-btn"
          onClick={() => (window.location = '/events')}
        >
          Show all events
        </button>
        <button
          className="main-btn"
          onClick={() => (window.location = '/properties')}
        >
          Show available properties
        </button>
      </div>
    </div>
  )
}
