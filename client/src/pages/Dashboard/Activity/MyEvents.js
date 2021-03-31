import React, { useState, useEffect, Profiler } from 'react'

import axios from 'axios'
import { Header, Preloader } from '../../../components'
import { app } from '../../../base'

export default () => {
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [properties, setProperties] = useState([])

  //   useEffect(() => {
  //     axios
  //       .get('http://localhost:5000/properties')
  //       .then((res) => setData(res.data))
  //   }, [])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="property-screen">
          <div className="wrapper">
            <h2>My events !</h2>
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text={'events'} />
      </React.Fragment>
    )
  }
}