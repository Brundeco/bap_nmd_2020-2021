import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckSession, Header, Preloader } from '../../components'
import { app } from '../../base'
import { ReservationCard } from '..'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const [featuredImg, setFeaturedImg] = useState()
  const storageRef = app.storage().ref()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reservations/${user.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(async () => {
    if (data) {
      data?.map(async (item) => {
        return storageRef
          .child(item?.firebase_ref + '/' + item?.image)
          .getDownloadURL()
          .then((url) => {
            setFeaturedImg(url)
          })
          .catch((err) => console.log(err))
      })
    }
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header
          locationsharing={() => {}}
          radius={() => {}}
          showfilters={() => {}}
        />
        <div className="reservation-screen">
          <h2 className="main-title">All your reservations are listed below</h2>
          {data?.length > 0 ? (
            data.map((item, index) => {
              return (
                <ReservationCard
                  address={item.property_address}
                  price={item.price}
                  date={item.createdAt}
                  image={featuredImg}
                  authorid={item.property_owner_id}
                  propid={item.property_id}
                  resid={item._id}
                  key={index}
                />
              )
            })
          ) : (
            <div className="reservations-component">
              <div className="alert-empty">
                <h2 className="semi-bold">No reservations</h2>
                <h4>
                  Let's click the button below and start discovering properties.
                </h4>
                <button
                  className="main-btn"
                  onClick={() => (window.location = '/properties')}
                >
                  Discover
                </button>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text={'reservations'} />
      </React.Fragment>
    )
  }
}
