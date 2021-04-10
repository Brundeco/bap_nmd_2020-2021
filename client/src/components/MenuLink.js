import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  icon,
  title,
  firstlink,
  firstlinkref,
  secondlink,
  secondlinkref,
}) => {
  return (
    <div className="menu-link-component">
      <h3>{title} </h3>
      <div className="menu-link-wrapper">
        <img src={icon} alt="icon" />
        <Link
          className="menu-link"
          to={{
            pathname: firstlinkref,
            state: { from: 'root' },
          }}
        >
          <li>{firstlink}</li>
        </Link>
      </div>
      <div className="menu-link-wrapper">
        <img src={icon} alt="icon" />
        <Link
          className="menu-link"
          to={{
            pathname: secondlinkref,
            state: { from: 'root' },
          }}
        >
          <li>{secondlink}</li>
        </Link>
      </div>
    </div>
  )
}
