import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PrevPage } from '.'
import profileIcon from './../icons/profile.svg'

export default () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userImage = user != null ? user.image : profileIcon
  return (
    <header className="header">
      <PrevPage />
      <div className="user-img">
        <Link
          className="link-to-dashboard"
          to={{ pathname: '/dashboard', state: { from: 'root' } }}
        >
          <img src={userImage} alt="" />
        </Link>
      </div>
    </header>
  )
}
