import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  distance,
  description,
  date,
  image,
  price,
  key,
  itemId,
  authorId,
}) => {
  return (
    <div key={key} className="list-item">
      <h2> {description}</h2>
      <h4>Daily price: {price} </h4>
      <h4> Date: {new Date(date).toDateString()} </h4>
      <h4>{distance == NaN ? '' : `${distance} km`}</h4>
      <div className="image">
        <img key={key} src={image} alt="" />
      </div>
      <ul>
        <Link
          to={{
            pathname: `/property/${itemId}/${authorId}`,
          }}
        >
          <li>Detail</li>
        </Link>
      </ul>
    </div>
  )
}
