import React from 'react'
import { Link } from 'react-router-dom'

export default ({ distance, city, title, date, image, itemId, zip }) => {
  return (
    <Link
      className="event-card"
      to={{
        pathname: `/event/${itemId}`,
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
            <h4 className="semi-bold"> {` ${zip} ${city} `} </h4>
            <h4> Starts on {new Date(date).toDateString()} </h4>
          </div>
          <div className="right">
            {distance == 'NaN' || distance == undefined ? (
              ''
            ) : (
              <h4>{`${distance} km`}</h4>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
