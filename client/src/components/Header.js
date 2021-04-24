import React, { useState, useEffect } from 'react'
import { Menu, PrevPage } from '.'

export default (props) => {
  const [status, setStatus] = useState(false)
  const [radius, setRadius] = useState()
  const [showFilters, setShowFilters] = useState()

  const handleChildStatus = (s) => {
    setStatus(s)
  }

  const handleRadius = (radius) => {
    setRadius(radius)
  }

  const handleFilters = (filters) => {
    setShowFilters(filters)
    console.log(filters)
  }

  return (
    <header
      className="header"
      radius={props.radius(radius)}
      showfilters={props.showfilters(showFilters)}
    >
      <PrevPage
        locationsharing={props.locationsharing}
        radius={handleRadius}
        showfilters={handleFilters}
      />
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
