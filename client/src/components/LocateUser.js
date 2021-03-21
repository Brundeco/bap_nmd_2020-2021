import React, { useState } from 'react'

export default (props) => {
  const [completed, setCompleted] = useState(false)
  const [response, setResponse] = useState()
  const [locationSharing, setLocationSharing] = useState()
  const [userLocation, setUserLocation] = useState({
    coordinates: { lat: '', lng: '' },
  })

  const onSuccess = async (userLoc) => {
    if (locationSharing == undefined) setLocationSharing(true)
    setResponse('Location sharing is enabled')
    localStorage.setItem('userLat', userLoc.coords.latitude)
    localStorage.setItem('userLon', userLoc.coords.longitude)
    setCompleted(true)
  }

  const onError = (error) => {
    if (locationSharing == undefined) setLocationSharing(false)
    setResponse('Location sharing is disabled')
    setCompleted(false)
    setUserLocation({
      error: {
        code: error.code,
        message: error.message,
      },
    })
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

  if (
    userLocation?.coordinates != undefined &&
    typeof userLocation?.coordinates?.lat != 'number'
  ) {
    locateUser()
  }

  return (
    <div
      err={props.err(response)}
      status={props.status(completed)}
      locationsharing={props.locationsharing(locationSharing)}
    />
  )
}
