import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import markerIcon from './../icons/mapMarker.svg'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
})

export default (props) => {
  const [lon, setLon] = useState(4.3517)
  const [lat, setLat] = useState(50.8503)

  useEffect(() => {
    if (props.lat != undefined && props.lon != undefined) {
      console.log(props.lat, props.lon)
      setLat(parseFloat(props.lat))
      setLon(parseFloat(props.lon))
    }
  }, [props.lat, props.lon])

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      center={[lon, lat]}
      zoom={[13]}
    >
      {props.coords.map((el) => {
        return (
          <Marker
            coordinates={[el[0], el[1]]}
            onClick={() => (window.location = el[2])}
          >
            <img src={markerIcon} />
          </Marker>
        )
      })}
    </Map>
  )
}
