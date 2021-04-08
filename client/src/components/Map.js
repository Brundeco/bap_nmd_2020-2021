import React, { useEffect, useState } from 'react'
import ReactMapboxGl, {
  Marker,
  Popup,
  Layer,
  Feature,
  MapContext,
} from 'react-mapbox-gl'
import { Link } from 'react-router-dom'
import markerIcon from './../icons/mapMarker.svg'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
})

export default (props) => {
  // Initialize map on Brussels Center if location is not shared
  const [lon, setLon] = useState(4.3517)
  const [lat, setLat] = useState(50.8503)
  const [showPopup, setShowPopup] = useState(false)
  // const [showPopup, setShowPopup] = useState('hide-popup')

  useEffect(() => {
    // Update lat & lon based on user position, if user has loc sharing enabled
    if (props.lat != undefined && props.lon != undefined) {
      setLat(parseFloat(props.lat))
      setLon(parseFloat(props.lon))
    }
  }, [props.lat, props.lon])

  useEffect(() => {
    // console.log(showPopup)
  }, [showPopup])

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '50vh',
        width: '80vw',
      }}
      bearing={[20]}
      pitch={[40]}
      center={[lon, lat]}
      zoom={[9]}
    >
      {props.coords.map((el, key) => {
        return (
          <Link
            key={key}
            to={{
              pathname: `${el[2]}`,
              state: { from: 'root' },
            }}
          >
            <Marker
              coordinates={[el[0], el[1]]}
              onZoomEnd={() => console.log('Marker was clicked')}
            >
              <img src={markerIcon} />
            </Marker>
          </Link>
        )
      })}
    </Map>
  )
}
