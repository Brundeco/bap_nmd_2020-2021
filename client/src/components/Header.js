import React, { useState } from 'react'
import { Menu, PrevPage } from '.'

export default (props) => {
  const [status, setStatus] = useState(false)
  const [radius, setRadius] = useState()

  const handleChildStatus = (s) => {
    setStatus(s)
  }

  const handleRadius = (radius) => {
    setRadius(radius)
  }

  return (
    <header className="header" radius={props.radius(radius)}>
      <PrevPage locationsharing={props.locationsharing} radius={handleRadius} />
      <Menu
        childstatus={handleChildStatus}
        status={status}
        className={status ? 'menu-wrapper show-menu' : 'menu-wrapper hide-menu'}
      />
      <div className="open-menu" onClick={() => setStatus(true)}>
        <div className="line" />
        <div className="line" />
      </div>
    </header>
  )
}
