import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList, NoLocation } from '..'
import axios from 'axios'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState()
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [optionsValue, setOptionsValue] = useState(
    localStorage.getItem('radius') || 5
  )

  const [options, setOptions] = useState([
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '15 km', value: 15 },
    { label: '30 km', value: 30 },
    { label: '50 km', value: 50 },
  ])

  const handleStatus = (status) => {
    setStatus(status)
  }

  return (
    <div>
      <Header />
      <LocateUser err={setError} status={handleStatus} />
      {/* {error ? <NoLocation /> : ''} */}
      <div className="home-screen">
        <section className="event-section">
          <h2>Events around you</h2>

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

          <div className="event-list">
            <GetEventList status={status} radius={optionsValue} />
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
