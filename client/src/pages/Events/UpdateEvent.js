import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EventFormUpdate } from '..'
import { app } from '../../base'
import { CheckSession, Header, Preloader } from '../../components'

export default ({ match }) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = useState()
  const [currentEvent, setCurrentEvent] = useState()
  const [file, setFile] = useState()
  const storageRef = app.storage()
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second please')

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`)
      .then((res) => setCurrentEvent(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await storageRef
      .ref(`${data?.firebaseRef}/${file?.id}`)
      .put(file)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    await axios
      .put(`${process.env.REACT_APP_API_URL}/events/${match.params.id}`, data)
      .then((res) => {
        setData(res.data)
        setPreloaderMsg('Event updated')
        setTimeout(() => {
          window.location = '/activity'
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
        setPreloaderMsg('Something went wrong')
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      })
  }

  const handleData = (formdata) => {
    setData(formdata)
  }
  const handleFile = (file) => {
    setFile(file)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setLoading(true)

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/events/delete/${match.params.id}`
      )
      .then((res) => {
        console.log(res)
        setTimeout(() => {
          setPreloaderMsg('Event was deleted 👋')
          window.location = '/activity'
        }, 1500)
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          setPreloaderMsg('Something went wrong')
          setLoading(false)
        }, 1500)
      })
  }

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        {loading ? <Preloader text={preloaderMsg} /> : ''}

        <Header
          locationsharing={() => {}}
          radius={() => {}}
          showfilters={() => {}}
        />
        <EventFormUpdate
          currentdata={currentEvent}
          delete={(e) => handleDelete(e)}
          onSubmit={handleSubmit}
          formdata={handleData}
          file={handleFile}
        />
      </div>
    </div>
  )
}
