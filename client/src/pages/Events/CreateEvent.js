import React, { useState, useEffect } from 'react'
import { CheckSession, PrevPage } from './../../components'
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
    console.log(data)

    storageRef
      .ref(`${data.firebaseRef}/${file.id}`)
      .put(file)
      .then((res) => console.log(res))

    axios
      .post(`${process.env.REACT_APP_API_URL}/events`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
      <div className="page-wrapper">
        <PrevPage />
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
