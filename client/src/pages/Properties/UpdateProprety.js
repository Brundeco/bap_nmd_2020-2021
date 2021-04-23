import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyFormUpdate from './PropertyFormUpdate'
import { app } from '../../base'
import { CheckSession, Header, Preloader } from '../../components'

export default ({ match, props }) => {
  CheckSession(localStorage.getItem('jwt'))
  const [currentProprety, setCurrentProprety] = useState()
  const storageRef = app.storage()
  const [data, setData] = useState()
  const [files, setFiles] = useState([])
  const [updatedImgs, setUpdatedImgs] = useState([])
  const [fetchImgUrls, setFetchImgUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [preloaderMsg, setPreloaderMsg] = useState('Just a second please')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    files.forEach(async (file) => {
      await storageRef
        .ref(`${data.firebaseRef}/${file.id}`)
        .put(file)
        .then((res) => console.log(res))
    })

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/properties/${match.params.id}`,
        data
      )
      .then((res) => {
        setData(res.data)
        setPreloaderMsg('Niet tonen aub!')
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

  const handleDelete = (e) => {
    e.preventDefault()
    setLoading(true)

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/properties/delete/${match.params.id}`
      )
      .then(() => {
        setTimeout(() => {
          setPreloaderMsg('Property was deleted 👋')
          window.location = '/activity'
        }, 2000)
      })
      .catch(() => {
        setTimeout(() => {
          setPreloaderMsg('Something went wrong')
          setLoading(false)
        }, 2000)
      })
  }

  return (
    <div className="create-product-screen">
      <div className="page-wrapper">
        {loading ? <Preloader text={preloaderMsg} /> : ''}
        <Header locationsharing={() => {}} radius={() => {}} />
        <PropertyFormUpdate
          formsubmit={handleSubmit}
          delete={(e) => handleDelete(e)}
          formdata={handleData}
          currentdata={currentProprety}
          files={handleFiles}
        />
      </div>
    </div>
  )
}
