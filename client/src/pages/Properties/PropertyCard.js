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
          <h3> {`${surface} m2`}</h3>

          <h4>Daily price: €{price} </h4>
          <h4> Date: {new Date(date).toDateString()} </h4>
        </div>
        <div className="right">
          <h4>
            {distance == 'NaN' || distance == undefined ? '' : `${distance} km`}
          </h4>
        </div>
      </div>
      <ul></ul>
    </Link>
  )
}
