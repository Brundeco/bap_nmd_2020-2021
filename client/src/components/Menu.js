import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import SearchIcon from './../icons/menu-search-icon.svg'
import ProfileIcon from './../icons/profile.svg'
import CloseMenu from './../icons/close-menu.svg'
import { Link } from 'react-router-dom'

export default (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userImage = user != null ? user.image : ProfileIcon

  const logout = (e) => {
    e.preventDefault()
    // localStorage.clear()
    window.location = '/login'
  }

  return (
    <div className={props.className}>
      <nav className="menu">
        <div className="menu-center">
          <div className="link-group">
            <h4>Browse</h4>
            <Link to={{ pathname: '/events', state: { from: 'root' } }}>
              Events
            </Link>
            <Link to={{ pathname: '/properties', state: { from: 'root' } }}>
              Properties
            </Link>
          </div>

          <div className="link-group">
            <h4>Create</h4>
            <Link to={{ pathname: '/create-event', state: { from: 'root' } }}>
              New event
            </Link>
            <Link
              to={{ pathname: '/create-property', state: { from: 'root' } }}
            >
              New property
            </Link>
          </div>

          <div className="link-group">
            <h4>Activity</h4>
            <Link to={{ pathname: '/activity', state: { from: 'root' } }}>
              Uploads
            </Link>
            <Link to={{ pathname: '/favorites', state: { from: 'root' } }}>
              Favorites
            </Link>
            <Link to={{ pathname: '/reservations', state: { from: 'root' } }}>
              Reservations
            </Link>
          </div>

          <div className="link-group">
            <h4>Chat</h4>
            <Link to={{ pathname: '/messages', state: { from: 'root' } }}>
              Messages
            </Link>
          </div>
          {user ? (
            <div className="link-group">
              <h4>Profile settings</h4>
              <Link to={{ pathname: '/profile', state: { from: 'root' } }}>
                Edit profile
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
        {user ? (
          <div className="menu-bottom flex flex-a-center flex-j-start">
            <Link
              className="menu-bottom flex flex-a-center flex-j-start"
              to={{ pathname: '/login', state: { from: 'root' } }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="menu-bottom flex flex-a-center flex-j-start">
            {/* <button onClick={(e) => logout(e)}>Log out</button> */}
            <Link
              className="menu-bottom flex flex-a-center flex-j-start"
              to={{ pathname: '/login', state: { from: 'root' } }}
            >
              Log in
            </Link>
          </div>
        )}
      </nav>
      <div className="close-menu">
        <div className="cross-box" onClick={() => props.childstatus(false)}>
          <img src={CloseMenu} alt="close-menu" />
        </div>
      </div>
    </div>
  )
}
