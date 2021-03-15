import React, { useState, useEffect, Profiler } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { Header, Preloader } from '../../components'
import { app } from '../../base'

export default () => {
  const [data, setData] = useState()
  const storageRef = app.storage().ref()
  const [images, setImages] = useState([])
  const [properties, setProperties] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/properties')
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(data)
    const promises = data
      ?.map((element) => {
        console.log(element)
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
        setImages((prevPropsFiles) => [...prevPropsFiles, ...newArray])
      })
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="property-screen">
          <div className="wrapper">
            {data?.map(function (item, i) {
              return (
                <div key={i} className="list-item">
                  <h2> {item.description}</h2>
                  <div className="image">
                    {images?.map(function (image, i) {
                      if (image?.includes(item.images[0])) {
                        return <img src={image} alt="" />
                      }
                    })}
                  </div>
                  <ul>
                    <Link
                      to={{
                        pathname: `/property/${item._id}/${item.author_id}`,
                      }}
                    >
                      <li>DETAIL</li>
                    </Link>
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Preloader text={'properties'} />
      </React.Fragment>
    )
  }
}
