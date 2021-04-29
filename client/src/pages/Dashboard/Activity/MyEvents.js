import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { app } from '../../../base'

export default () => {
  const user = JSON.parse(localStorage.getItem('user')).id
  const [data, setData] = useState()
  const [images, setImages] = useState([])
  const storageRef = app.storage().ref()

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/events/admin`, { id: user })
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    if (data) {
      const arr = data?.map((item) => {
        return storageRef
          .child(item?.firebaseRef + '/' + item?.image)
          .getDownloadURL()
      })
      Promise.all(arr)
        .then((urls) => {
          setImages(urls)
        })
        .catch((err) => console.log(err))
    }
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
                    pathname: `/update-event/${item._id}`,
                  }}
                >
                  <li>Update</li>
                </Link>
              </div>
              <div className="list-part">
                <img src={images[i]} alt="event-image" />
              </div>
              <div className="list-part">
                <h3> {item?.zip + ', ' + item?.city} </h3>
              </div>
            </div>
          )
        })
      ) : (
        <div className="alert-empty">
          <h2 className="semi-bold">Nothing found</h2>
          <h4>You did not create your own events yet</h4>
          <button
            className="main-btn"
            onClick={() => (window.location = '/create-event')}
          >
            Create event
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
