import React, { useRef, useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'

export default (props) => {
  const [lon, setLon] = useState()
  const [lat, setLat] = useState()
  const [viewport, setViewport] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 12,
  })

  useEffect(() => {
    if (props.lat != undefined && props.lon != undefined) {
      console.log(props.lat, props.lon)
      setViewport({
        zoom: 12,
        latitude: parseFloat(props.lat),
        longitude: parseFloat(props.lon),
      })
    }
  }, [props.lat, props.lon])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      width="100vw"
      height="50vh"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  )
}
