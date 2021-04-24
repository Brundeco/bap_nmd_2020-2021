import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EventFormUpdate } from '..'
import { app } from '../../base'
import { CheckSession, Header } from '../../components'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = useState()
  const [currentEvent, setCurrentEvent] = useState()
  const [file, setFile] = useState()
  const storageRef = app.storage()

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`)
      .then((res) => setCurrentEvent(res.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    storageRef
      .ref(`${data?.firebaseRef}/${file?.id}`)
      .put(file)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    axios
      .put(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`, data)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  const handleData = (formdata) => {
    setData(formdata)
  }
  const handleFile = (file) => {
    setFile(file)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <Header
          locationsharing={() => {}}
          radius={() => {}}
          showfilters={() => {}}
        />
        <h1>Update event</h1>
        <EventFormUpdate
          currentdata={currentEvent}
          onSubmit={handleSubmit}
          formdata={handleData}
          file={handleFile}
        />
      </div>
    </div>
  )
}
