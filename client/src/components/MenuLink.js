import React from 'react'
import { NavLink } from 'react-router-dom'

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
        <NavLink
          to={{
            pathname: firstlinkref,
            state: { from: 'root' },
          }}
          activeStyle={{
            fontWeight: '600',
          }}
        >
          {firstlink}
        </NavLink>
      </div>
      <div className="menu-link-wrapper">
        <img src={icon} alt="icon" />
        <NavLink
          className="menu-link"
          to={{
            pathname: secondlinkref,
            state: { from: 'root' },
          }}
          activeStyle={{
            fontWeight: '600',
          }}
        >
          {secondlink}
        </NavLink>
      </div>
    </div>
  )
}
