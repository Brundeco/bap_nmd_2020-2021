import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'
import { ConvertDate } from '../../../components'

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

  return (
    <React.Fragment>
      {data?.length > 0 ? (
        data?.map((item, i) => {
          return (
            <Link
              key={i}
              className="main-list-item"
              to={{
                pathname: `/update-property/${item._id}`,
              }}
            >
              <div className="image">
                {propFiles?.map((image, i) => {
                  if (image?.includes(item.images[0])) {
                    return <img src={image} alt="" />
                  }
                })}
              </div>
              <div className="info">
                <h3 className="main-title">
                  {item?.street + ', ' + item?.houseNumber},
                  {item?.zip + ', ' + item?.city}
                </h3>
                <span> Added on {ConvertDate(data?.createdAt)} </span>
              </div>
            </Link>
          )
        })
      ) : (
        <div className="alert-empty">
          <h2 className="semi-bold">Nothing found</h2>
          <h4>You did not create your own propreties yet</h4>
          <button
            className="main-btn"
            onClick={() => (window.location = '/create-property')}
          >
            Create property
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
