import React, { useState, useEffect } from 'react'
import { Header, CheckSession, LocateUser } from '../../components'
import { GetEventList, NoLocation } from '..'
import axios from 'axios'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [data, setData] = useState()
  const [status, setStatus] = useState()
  const [error, setError] = useState()

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
