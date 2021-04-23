import React, { useState, useEffect } from 'react'
import { CheckSession, Preloader, PrevPage } from './../../components'
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
        console.log(res)
        axios
          .post(`${process.env.REACT_APP_API_URL}/events`, data)
          .then(() => {
            setPreloaderMsg('Succes, event was added! 🚀')
            localStorage.setItem('activity', 'My events')
            setTimeout(() => {
              window.location = '/activity'
            }, 2000)
          })
          .catch(() => {
            setPreloaderMsg('Sorry, something went wrong! 😒')
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          })
      })
      .catch(() => {
        setPreloaderMsg('Sorry, something went wrong! 😒')
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleFile = (file) => {
    setFile(file)
  }
  return (
    <div
      // className="create-product-screen"
      className={
        !preview || !newPreview
          ? 'create-product-screen'
          : 'create-product-screen no-scroll'
      }
    >
      {loading ? <Preloader text={preloaderMsg} /> : ''}

      <div className="page-wrapper">
        <PrevPage locationsharing={() => {}} radius={() => {}} />
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
    </div>
  )
}
