import React, { useState } from 'react'

export default (props) => {
  const [completed, setCompleted] = useState(false)
  const [userLocation, setUserLocation] = useState({
    coordinates: { lat: '', lng: '' },
  })
  const [response, setResponse] = useState()

  const onSuccess = async (userLoc) => {
    setResponse('Location sharing is enabled')
    localStorage.setItem('userLat', userLoc.coords.latitude)
    localStorage.setItem('userLon', userLoc.coords.longitude)
    setCompleted(!completed)
  }

  const onError = (error) => {
    console.log('loc is disabled')
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

  return <div err={props.err(response)} status={props.status(completed)} />
}
