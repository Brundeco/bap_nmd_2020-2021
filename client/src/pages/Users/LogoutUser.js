import React from 'react'
import LogoutIcon from './../../icons/logout.svg'

export default () => {
  const logout = () => {
    localStorage.clear()
    window.location = '/login'
  }

  return (
    <button onClick={logout}>
      <img src={LogoutIcon} />
    </button>
  )
}
