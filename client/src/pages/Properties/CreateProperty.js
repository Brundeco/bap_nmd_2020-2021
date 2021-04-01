import React, { useState, useEffect } from 'react'
import {
  CheckSession,
  PreloaderSpinningWheel,
  PrevPage,
} from './../../components'
import axios from 'axios'
import { PropertyFormCreate, PropertyReview } from '..'
import { app } from '../../base'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = React.useState()
  const [files, setFiles] = useState([])
  const storageRef = app.storage()
  const [preview, setPreview] = useState(false)
  const [newPreview, setNewPreview] = useState(false)
  const [progress, setProgress] = useState(false)

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleData = (formData) => {
    setData(formData)
  }

  const handleFiles = (files) => {
    setFiles(files)
  }

  const handlePreview = (preview) => {
    setPreview(preview)
  }

  const handleNewPreview = (preview) => {
    setNewPreview(preview)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProgress(true)

    Promise.all(
      files.map((file) =>
        storageRef.ref(`${data.firebaseRef}/${file.id}`).put(file)
      )
    ).then(() => {
      setProgress(false)
    })

    axios
      .post(`${process.env.REACT_APP_API_URL}/properties`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div
      className="create-product-screen"
      className={
        !preview || !newPreview
          ? 'create-product-screen'
          : 'create-product-screen no-scroll'
      }
    >
      <div className={progress ? 'await-result show' : 'await-result hide'}>
        {progress ? (
          <PreloaderSpinningWheel text="Adding property to database" />
        ) : (
          ''
        )}
      </div>
      <div className="page-wrapper">
        <PrevPage />
        <PropertyFormCreate
          onSubmit={handleSubmit}
          formdata={handleData}
          files={handleFiles}
          preview={handlePreview}
        />
        <PropertyReview
          files={files}
          data={data}
          preview={preview}
          newpreview={handleNewPreview}
          handleSubmit={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  )
}
