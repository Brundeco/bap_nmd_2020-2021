import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { Header, Preloader } from '../../components'
import { app } from '../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user')).id
  const [data, setData] = useState()
  const [propFiles, setPropFiles] = useState([])
  const storageRef = app.storage().ref()
  const userId = user
  useEffect(() => {
    axios
      .post('http://localhost:5000/properties/admin', { id: userId })
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    const promises = data
      ?.map((element) => {
        return element?.images?.map(async (el) => {
          const url = await storageRef
            .child(element.firebaseRef + '/' + el)
            .getDownloadURL()
          return url
        })
      })
      .filter(Boolean)
    const promisesArr = promises?.flat()
    promisesArr &&
      Promise.all(promisesArr).then((newArray) => {
        console.log(newArray)
        setPropFiles((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="properties-admin-screen page-wrapper">
          <h1>Admins properties</h1>
          {data?.map((item) => {
            return (
              <div className="main-list-item">
                <div className="list-part">
                  <button
                    onClick={() =>
                      (window.location = 'update-property/' + item._id)
                    }
                  >
                    Update
                  </button>
                </div>
                <div className="list-part">
                  {propFiles?.map(function (image, i) {
                    if (image?.includes(item.images[0])) {
                      return <img src={image} alt="" />
                    }
                  })}
                </div>
                <div className="list-part">
                  <h3> {item?.zip + ', ' + item?.city} </h3>
                </div>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  } else {
    return <Preloader text="Loading your properties" />
  }
}
