import React, { useState, useEffect } from 'react'
import { GetEventList } from '..'
import { CheckSession, Header, LocateUser, Map } from '../../components'

export default (props) => {
  CheckSession(localStorage.getItem('jwt'))
  const [locationSharing, setLocationSharing] = useState()
  const [markers, setMarkers] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLon, setUserLon] = useState()
  const [radius, setRadius] = useState()

  useEffect(() => {
    console.log(markers)
  }, [markers])

  useEffect(() => {
    setUserLat(localStorage.getItem('userlat'))
    setUserLon(localStorage.getItem('userlng'))
    setLocationSharing(localStorage.getItem('locationsharing'))
  }, [])

  const handleRadius = (radius) => {
    setRadius(radius)
  }

  return (
    <React.Fragment>
      <Header locationsharing={locationSharing} radius={handleRadius} />
      <div className="page-top-padding">
        {userLat && userLon ? (
          <Map lat={userLat} lon={userLon} coords={markers} />
        ) : (
          <Map lat={50.8503} lon={4.3517} coords={markers} />
        )}
        <div className="page-wrapper">
          <GetEventList
            radius={radius}
            locationsharing={locationSharing}
            markers={(coords) => setMarkers(coords)}
            lat={userLat}
            lng={userLon}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
