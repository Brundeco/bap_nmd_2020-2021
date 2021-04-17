import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import SearchIcon from './../icons/menu-search-icon.svg'
import ProfileIcon from './../icons/profile.svg'
import CloseMenu from './../icons/close-menu.svg'
import { Link } from 'react-router-dom'
import { MenuLink } from '.'

export default (props, { parentCallback }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userImage = user != null ? user.image : ProfileIcon

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location = '/login'
  }

  return (
    <div className={props.className}>
      <nav className="menu">
        <div className="menu-top">
          <div className="user-img">
            <Link
              className="link-to-dashboard"
              to={{ pathname: '/', state: { from: 'root' } }}
            >
              <img src={userImage} alt="" />
            </Link>
            <h3> Bruno De Coene </h3>
          </div>
        </div>

        <MenuLink
          icon={SearchIcon}
          title="Browse"
          firstlink="Events"
          firstlinkref="/events"
          secondlink="Properties"
          secondlinkref="/properties"
        />

        <MenuLink
          icon={SearchIcon}
          title="Create"
          firstlink="New event"
          firstlinkref="/create-event"
          secondlink="New property"
          secondlinkref="/create-property"
        />

        <MenuLink
          icon={SearchIcon}
          title="Activity"
          firstlink="Uploads"
          firstlinkref="/activity"
          secondlink="Favorites"
          secondlinkref="/favorites"
        />

        <button onClick={(e) => logout(e)}>Logout</button>
      </nav>
      <div className="close-menu">
        <div className="cross-box" onClick={() => props.childstatus(false)}>
          <img src={CloseMenu} alt="close-menu" />
        </div>
      </div>
    </div>
  )
}
