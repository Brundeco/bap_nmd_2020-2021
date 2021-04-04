import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckSession, Header, Preloader } from '../../components'

export default () => {
  CheckSession(localStorage.getItem('jwt'))

  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState()
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reservations/${user.id}`)
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (data != undefined) {
    return (
      <React.Fragment>
        <Header />
        <div className="property-screen">
          <div className="wrapper">
            {data?.map(function (item, i) {
              console.log(item)
              return (
                <div key={i} className="list-item">
                  <h2> {item.description}</h2>
                  <ul>
                    <a
                      href={`/property/${item.property_id}/${item.property_owner_id}`}
                    >
                      View property
                    </a>
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
        <Preloader text={'reservations'} />
      </React.Fragment>
    )
  }
}
