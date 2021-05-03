import React, { useState, useEffect } from 'react'
import { GetEventList } from '..'
import { CheckSession, Header, Map } from '../../components'

export default () => {
  const [locationSharing, setLocationSharing] = useState()
  const [markers, setMarkers] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLon, setUserLon] = useState()
  const [radius, setRadius] = useState()
  const [showFilters, setShowFilters] = useState()

  useEffect(() => {
    const locSharing =
      localStorage.getItem('locationsharing') == 'true' ? true : false
    if (locSharing) {
      const userlat = localStorage.getItem('userlat')
      const userLon = localStorage.getItem('userlng')
      setUserLat(userlat)
      setUserLon(userLon)
      setLocationSharing(locSharing)
    }
  }, [])

  // useEffect(() => {
  //   console.log(markers)
  // }, [markers])

  const handleRadius = (radius) => {
    setRadius(radius)
  }

  const handleFilters = (filters) => {
    setShowFilters(filters)
  }

  return (
    <React.Fragment>
      <Header
        locationsharing={locationSharing}
        radius={handleRadius}
        showfilters={handleFilters}
      />
      <div className="events-screen map-sidebar">
        <section className="main">
          <h1 className="main-title">Currently available events</h1>

          <GetEventList
            radius={radius}
            locationsharing={locationSharing}
            markers={(coords) => setMarkers(coords)}
            lat={userLat}
            lng={userLon}
            showfilters={showFilters}
          />
        </section>
        <section className="map">
          <h1 className="main-title">Map view</h1>

          {userLat && userLon ? (
            <Map lat={userLat} lon={userLon} coords={markers} />
          ) : (
            <Map lat={50.8503} lon={4.3517} coords={markers} />
          )}
        </section>
      </div>
    </React.Fragment>
  )
}
