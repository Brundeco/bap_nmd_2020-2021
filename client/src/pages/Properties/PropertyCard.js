import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  distance,
  surface,
  date,
  image,
  price,
  id,
  itemId,
  authorId,
  city,
  zip,
}) => {
  return (
    <React.Fragment key={id}>
      <Link
        className="property-card"
        to={{
          pathname: `/property/${itemId}/${authorId}`,
        }}
      >
        <div className="image">
          <img key={id} src={image} alt="" />
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
      </Link>
    </React.Fragment>
  )
}
