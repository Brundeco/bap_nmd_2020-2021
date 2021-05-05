import React, { useState } from 'react'
import { CheckSession, Header, Preloader } from './../../components'
import axios from 'axios'
import { app } from '../../base'
import EventFormCreate from './EventFormCreate'
import EventReview from './EventReview'

export default () => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = React.useState()
  const [file, setFile] = useState()
  const storageRef = app.storage()
  const [preview, setPreview] = useState(false)
  const [newPreview, setNewPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second please')

  const handleData = (formData) => {
    setData(formData)
  }

  const handlePreview = (preview) => {
    setPreview(preview)
  }

  const handleNewPreview = (preview) => {
    setNewPreview(preview)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    storageRef
      .ref(`${data.firebaseRef}/${file.id}`)
      .put(file)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/events`, data)
          .then(() => {
            setPreloaderMsg('Event added! 🚀')
            localStorage.setItem('activity', 'My events')
            setTimeout(() => {
              window.location = '/activity'
            }, 2000)
          })
          .catch(() => {
            setPreloaderMsg('Something went wrong...')
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          })
      })
      .catch(() => {
        setPreloaderMsg('Something went wrong...')
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      })
  }

  const handleFile = (file) => {
    setFile(file)
  }
  return (
    <div
      className={
        !preview || !newPreview
          ? 'create-product-screen'
          : 'create-product-screen no-scroll'
      }
    >
      {loading ? <Preloader text={preloaderMsg} /> : ''}

      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <EventFormCreate
        onSubmit={handleSubmit}
        formdata={handleData}
        file={handleFile}
        preview={handlePreview}
      />
      <EventReview
        files={file}
        data={data}
        preview={preview}
        newpreview={handleNewPreview}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </div>
  )
}
