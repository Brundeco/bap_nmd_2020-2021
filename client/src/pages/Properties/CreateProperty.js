import React, { useState, useEffect } from 'react'
import {
  CheckSession,
  PreloaderSpinningWheel,
  PrevPage,
} from './../../components'
import axios from 'axios'
import { PropertyFormCreate, PropertyPreview } from '..'
import { app } from '../../base'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = React.useState()
  const [files, setFiles] = useState([])
  const storageRef = app.storage()
  const [preview, setPreview] = useState(false)
  const [newPreview, setNewPreview] = useState(false)
  const [progress, setProgress] = useState(false)

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

  useEffect(() => {
    // console.log(`'PREVIEW' ${preview}`)
  }, [preview])

  useEffect(() => {
    // console.log(`'NEW PREVIEW' ${newPreview}`)
    console.log(newPreview)
  }, [newPreview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProgress(true)
    files.forEach((file) => {
      console.log(file.id)
      storageRef
        .ref(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .then((res) => {
          setProgress(false)
          console.log(res)
        })
    })

    axios
      .post('http://localhost:5000/properties', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // console.log(data)
  }, [data])

  useEffect(() => {
    // console.log(files)
  }, [files])

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
        <PropertyPreview
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
