import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import markerIcon from './../icons/mapMarker.svg'

const Marker = ({ title, address }) => (
  <div
    className="map-marker"
    onMouseEnter={() => console.log('I was hovered')}
    onMouseLeave={() => console.log('Hover was ended')}
  >
    <img src={markerIcon} />
    <div className="map-marker-info">
      <h4> {title} </h4>
      <p> {address} </p>
    </div>
  </div>
)

export default (props) => {
  // Initialize map on Brussels Center if location is not shared
  const [zoom, setZoom] = useState(11)
  const [centerMap, setCenterMap] = useState({})

  useEffect(() => {
    // Update lat & lon based on user position, if user has loc sharing enabled
    setCenterMap({
      lat: parseFloat(props.lat),
      lng: parseFloat(props.lon),
    })
  }, [props.lat, props.lon])

  return (
    <div
      style={{
        height: '30vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 5%',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={centerMap}
          defaultZoom={zoom}
        >
          {props.coords.map((el, key) => {
            // console.log(el)
            return (
              <Marker
                key={key}
                lat={parseFloat(el[1])}
                lng={parseFloat(el[0])}
                title={el[3]}
                address={el[4]}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    </div>
  )
}
