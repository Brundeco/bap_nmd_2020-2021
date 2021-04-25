import React, { useState } from 'react'
import { Menu, PrevPage } from '.'
import MenuIcon from './../icons/menu.svg'

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
  }

  return (
    <section>
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
        <div className="flex full-width flex-j-end">
          <Menu
            childstatus={handleChildStatus}
            status={status}
            className={
              status ? 'menu-wrapper show-menu' : 'menu-wrapper hide-menu'
            }
          />
          <div className="open-menu" onClick={() => setStatus(true)}>
            <img src={MenuIcon} />
            {/* Menu */}
          </div>
        </div>
      </header>
    </section>
  )
}
