import React, { useState, useEffect } from 'react'
import { CheckSession, Preloader, PrevPage } from './../../components'
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
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second please')

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
    setLoading(true)

    Promise.all(
      files.map((file) =>
        storageRef.ref(`${data.firebaseRef}/${file.id}`).put(file)
      )
    )
      .then((res) => {
        console.log(res)
        axios
          .post(`${process.env.REACT_APP_API_URL}/properties`, data)
          .then(() => {
            setPreloaderMsg('Succes, property added! 🚀')
            localStorage.setItem('activity', 'My properties')
            setTimeout(function () {
              window.location = '/activity'
            }, 2000)
          })
          .catch((err) => console.log(err))
      })
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
      {loading ? <Preloader text={preloaderMsg} /> : ''}

      <div className="page-wrapper">
        <PrevPage locationsharing={() => {}} radius={() => {}} />
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
