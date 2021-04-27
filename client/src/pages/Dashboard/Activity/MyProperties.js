import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

  return (
    <React.Fragment>
      {data?.length > 0 ? (
        data?.map((item, i) => {
          return (
            <div className="main-list-item" key={i}>
              <div className="list-part">
                <Link
                  to={{
                    pathname: `/update-property/${item._id}`,
                  }}
                >
                  <li>Edit</li>
                </Link>
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
        })
      ) : (
        <div>
          <h2 className="semi-bold">Nothing found</h2>
          <h4>You did not create you own propreties yet</h4>
        </div>
      )}
    </React.Fragment>
  )
}
