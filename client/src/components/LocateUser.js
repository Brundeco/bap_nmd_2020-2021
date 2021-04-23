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
    console.log(userLoc)
    setLocation({
      loaded: true,
      coordinates: {
        lat: userLoc.coords.latitude,
        lng: userLoc.coords.longitude,
      },
    })
  }

  const onError = (error) => {
    console.log(error)
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




// import React, { useState, useEffect } from 'react'
// import { CheckSession } from '.'

// export default (props) => {
//   CheckSession(localStorage.getItem('jwt'))
//   const [response, setResponse] = useState()
//   const [loaded, setLoaded] = useState(false)

//   const [location, setLocation] = useState({
//     loaded: false,
//     coordinates: { lat: '', lng: '' },
//     error: '',
//   })

//   const onSuccess = async (userLoc) => {
//     console.log(userLoc)
//     console.log('ok ok ok ')
//     setLocation({
//       loaded: true,
//       coordinates: {
//         lat: userLoc.coords.latitude,
//         lng: userLoc.coords.longitude,
//       },
//     })
//   }

//   const onError = (error) => {
//     console.log(error)
//     setLoaded(true)
//     console.log(error.message)
//     setLocation({
//       loaded: true,
//       error: error.message,
//     })
//   }

//   useEffect(() => {
//     console.log(location)
//   }, [location])

//   useEffect(() => {
//     if (!('geolocation' in navigator)) {
//       setLocation((prev) => ({
//         ...prev,
//         loaded: true,
//         error: {
//           code: 0,
//           message: 'Geolocation not supported',
//         },
//       }))
//     }
//     navigator.geolocation.getCurrentPosition(onSuccess, onError)
//   }, [])

  // console.log('uuu')
  // let options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // }

  // const success = (pos) => {
  //   let crd = pos.coords

  //   console.log('Your current position is:')
  //   console.log(`Latitude : ${crd.latitude}`)
  //   console.log(`Longitude: ${crd.longitude}`)
  //   console.log(`More or less ${crd.accuracy} meters.`)
  //   return 'top'
  // }

  // const error = (err) => {
  //   console.warn(`ERROR(${err.code}): ${err.message}`)
  //   return 'fucked'
  // }

  // navigator.geolocation.getCurrentPosition(success, error, options)
// }
