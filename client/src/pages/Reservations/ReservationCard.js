import React from 'react'
import { Link } from 'react-router-dom'

export default ({ price, address, title, date, image, resid, propid }) => {
  return (
    <Link
      className="reservation-card"
      to={{
        pathname: `/reservation/${resid}/${propid}`,
        state: { from: 'root' },
      }}
    >
      <div className="info">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="left">
          <h3> {title} </h3>
          <h3>{address}</h3>
          <h4>
            {`Reserved on `}
            <span className="semi-bold">{new Date(date).toDateString()}</span>
          </h4>
          <div className="flex">
            <h4 className="price-bg-color">{`Paid €${price}`}</h4>
          </div>
        </div>
      </div>
    </Link>
  )
}
