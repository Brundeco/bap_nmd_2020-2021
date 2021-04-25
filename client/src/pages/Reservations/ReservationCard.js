import React from 'react'
import { Link } from 'react-router-dom'

export default ({ price, address, title, date, image, resid, propid }) => {
  return (
    <Link
      className="event-card"
      to={{
        pathname: `/reservation/${resid}/${propid}`,
        state: { from: 'root' },
      }}
    >
      <div>
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="info">
          <div className="left">
            <h3> {title} </h3>
            <h3>{address}</h3>
            <h4>
              {`Reserved on `}
              <span className="semi-bold">
                {new Date(date).toDateString()}
              </span>{' '}
            </h4>
          </div>
          <div className="right">
            <h4>{`€ ${price}`}</h4>
          </div>
        </div>
      </div>
    </Link>
  )
}
