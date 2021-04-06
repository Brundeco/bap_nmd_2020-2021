import React, { useEffect, useState } from 'react'
import ReactMapboxGl, {
  Marker,
  Popup,
  Layer,
  Feature,
  MapContext,
} from 'react-mapbox-gl'
import markerIcon from './../icons/mapMarker.svg'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
})

export default (props) => {
  const [lon, setLon] = useState(4.3517)
  const [lat, setLat] = useState(50.8503)
  const [showPopup, setShowPopup] = useState(false)
  // const [showPopup, setShowPopup] = useState('hide-popup')

  useEffect(() => {
    if (props.lat != undefined && props.lon != undefined) {
      // console.log(props.lat, props.lon)
      setLat(parseFloat(props.lat))
      setLon(parseFloat(props.lon))
    }
  }, [props.lat, props.lon])

  // console.log(props.coords)

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
      {props.coords.map((el) => {
        // console.log(el)
        // console.log('Marker loop fired!')
        return (
          <React.Fragment>
            {/* <Feature onMouseMove={() => console.log('You are moving')}> */}
            <Marker
              onMouseMove={() => console.log('Mouse has moved')}
              coordinates={[el[0], el[1]]}
              // onClick={() => (window.location = el[2])}
              onClick={() => console.log('Marker was clicked')}
              onZoomEnd={() => console.log('Marker was clicked')}
            >
              <img src={markerIcon} />
            </Marker>

            {/* {showPopup && ( */}
            {/* <Popup className={showPopup} coordinates={[el[0], el[1]]}>
              <h1> popup </h1>
            </Popup> */}
            {/* )} */}
            {/* </Feature> */}
          </React.Fragment>
        )
      })}
    </Map>
  )
}
