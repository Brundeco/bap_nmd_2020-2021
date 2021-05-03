import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import markerIcon from './../icons/mapMarker.svg'
import { Link } from 'react-router-dom'

const Marker = ({ title, address, path }) => (
  <div className="map-marker">
    <img src={markerIcon} />
    <Link
      to={{ pathname: path, state: { from: 'root' } }}
      className="map-marker-info"
    >
      <h4> {title} </h4>
      <p> {address} </p>
    </Link>
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
        height: '100%',
        width: '100%',
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
            console.log(el)
            return (
              <Marker
                key={key}
                lat={parseFloat(el[1])}
                lng={parseFloat(el[0])}
                title={el[3]}
                address={el[4]}
                path={el[2]}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    </div>
  )
}
