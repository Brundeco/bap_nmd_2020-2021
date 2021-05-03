import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  distance,
  surface,
  date,
  image,
  price,
  key,
  itemId,
  authorId,
  city,
  zip,
}) => {
  return (
    <Link
      key={key}
      className="property-card"
      to={{
        pathname: `/property/${itemId}/${authorId}`,
      }}
    >
      <div className="image">
        <img key={key} src={image} alt="" />
      </div>

      <div className="info">
        <div className="left">
          <div className="flex">
            <h3> {`${zip} ${city}`} </h3>
            <span>•</span>
            <h3> {`${surface} m2`}</h3>
          </div>
          <h4>{`Daily price: € ${price}`} </h4>
        </div>
        <div className="right">
          {distance == 'NaN' || distance == undefined ? (
            ''
          ) : (
            <h4>{`${distance} km`}</h4>
          )}
        </div>
      </div>
      <ul></ul>
    </Link>
  )
}
