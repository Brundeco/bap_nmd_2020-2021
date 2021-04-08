import React, { useState, useEffect } from 'react'

export default (props) => {
  const [response, setResponse] = useState()
  const [loaded, setLoaded] = useState(false)

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    error: '',
  })

  const onSuccess = async (userLoc) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: userLoc.coords.latitude,
        lng: userLoc.coords.longitude,
      },
    })
  }

  const onError = (error) => {
    setLoaded(true)
    console.log(error.message)
    setLocation({
      loaded: true,
      error: error.message,
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation((prev) => ({
        ...prev,
        loaded: true,
        error: {
          code: 0,
          message: 'Geolocation not supported',
        },
      }))
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}
