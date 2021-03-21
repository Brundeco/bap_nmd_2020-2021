import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList, NoLocation } from '..'
import axios from 'axios'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState()
  const [status, setStatus] = useState()
  const [error, setError] = useState()
  const [optionState, setOptionState] = useState()

  const handleStatus = (status) => {
    setStatus(status)
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then((res) => {
        setData(res.data.events)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <Header />
      <LocateUser err={setError} status={handleStatus} />
      {/* {error ? <NoLocation /> : ''} */}
      <div className="home-screen">
        <section className="event-section">
          <h2>Events around you</h2>
          <label for="cars">Select radius</label>

          <select value={optionsState}>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="15">15 km</option>
            <option value="30">30 km</option>
            <option value="50">50 km</option>
          </select>
          
          <div className="event-list">
            <GetEventList status={status} />
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
