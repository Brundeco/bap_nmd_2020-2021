import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { app } from '../../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user')).id
  const [data, setData] = useState()
  const [propFiles, setPropFiles] = useState([])
  const storageRef = app.storage().ref()

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/properties/admin`, { id: user })
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
        setPropFiles((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        {/* <div className="properties-admin-screen page-wrapper"> */}
        {data?.map((item, i) => {
          return (
            <div className="main-list-item" key={i}>
              {console.log(i)}
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
        {/* </div> */}
      </React.Fragment>
    )
  } else {
    return <h2>You don't have properties yet</h2>
  }
}
