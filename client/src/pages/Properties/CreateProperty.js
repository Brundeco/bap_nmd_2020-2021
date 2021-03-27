import React, { useState, useEffect } from 'react'
import { CheckSession, PrevPage } from './../../components'
import axios from 'axios'
import { PropertyFormCreate } from '..'
import { app } from '../../base'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))

  const [data, setData] = React.useState()
  const [files, setFiles] = useState([])
  const storageRef = app.storage()

  const handleData = (formData) => {
    setData(formData)
  }

  const handleFiles = (files) => {
    setFiles(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    files.forEach((file) => {
      console.log(file.id)
      storageRef
        .ref(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .then((res) => console.log(res))
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
    <div className="create-product-screen">
      <div className="page-wrapper">
        <PrevPage />
        <PropertyFormCreate
          onSubmit={handleSubmit}
          formdata={handleData}
          files={handleFiles}
        />
      </div>
    </div>
  )
}
