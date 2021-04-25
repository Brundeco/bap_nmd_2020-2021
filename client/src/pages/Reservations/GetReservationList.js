import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckSession, Header, Preloader } from '../../components'
import { app } from '../../base'
import { ReservationCard } from '..'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  const [property, setProperty] = useState()
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

  useEffect(() => {
    console.log(property)
  }, [property])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header
          locationsharing={() => {}}
          radius={() => {}}
          showfilters={() => {}}
        />
        {data.map((item, index) => {
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
        })}
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
