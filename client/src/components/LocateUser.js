import React, { useState } from 'react'

// const requestLocation = localStorage.getItem('askLocation')
// console.log(requestLocation)

export default (props) => {
  const [response, setResponse] = useState()
  const [locationSharing, setLocationSharing] = useState()
  // const [userLocation, setUserLocation] = useState({
  //   coordinates: { lat: '', lng: '' },
  // })

  const onSuccess = async (userLoc) => {
    console.log('Location sharing is TRUE')
    if (locationSharing == undefined) {
      setLocationSharing(true)
      setResponse('Location sharing is enabled')
      localStorage.setItem('userLat', userLoc.coords.latitude)
      localStorage.setItem('userLon', userLoc.coords.longitude)
      localStorage.setItem('askLocation', false)
    }
  }

  const onError = (error) => {
    console.log('Location sharing is FALSE')
    if (locationSharing == undefined) {
      setLocationSharing(false)
      setResponse('Location sharing is disabled')
    }
  }

  const locateUser = () => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }

  locateUser()

  return (
    <div
      err={props.err(response)}
      locationsharing={props.locationsharing(locationSharing)}
    />
  )
}
