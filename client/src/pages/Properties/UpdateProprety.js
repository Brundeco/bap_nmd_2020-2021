import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyFormUpdate from './PropertyFormUpdate'
import { app } from '../../base'
import { CheckSession, PrevPage } from '../../components'

export default ({ match, props }) => {
  CheckSession(localStorage.getItem('jwt'))

  const [currentProprety, setCurrentProprety] = useState()
  const storageRef = app.storage()
  const [data, setData] = useState()
  const [files, setFiles] = useState([])
  const [updatedImgs, setUpdatedImgs] = useState([])
  const [fetchImgUrls, setFetchImgUrls] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties/${match.params.id}`)
      .then((res) => {
        setCurrentProprety(res.data)
        setFetchImgUrls(res.data?.images)
      })
  }, [])

  const handleData = (formData) => {
    setData(formData)
  }

  const handleFiles = (files) => {
    setFiles(files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    files.forEach((file) => {
      storageRef
        .ref(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .then((res) => console.log(res))
    })
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/properties/${match.params.id}`,
        data
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <PropertyFormUpdate
          onSubmit={handleSubmit}
          formdata={handleData}
          currentdata={currentProprety}
          files={handleFiles}
        />
      </div>
    </div>
  )
}
