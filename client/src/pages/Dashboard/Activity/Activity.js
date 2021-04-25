import React, { useState, useEffect } from 'react'
import { CheckSession, Header } from '../../../components'
import LogoutUser from '../../Users/LogoutUser'
import MyProperties from './MyProperties'
import MyEvents from './MyEvents'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [currentComponent, setCurrentComponent] = useState('favorites')
  const dashboardTab = localStorage.getItem('activity')
  const [isActive, setisActive] = useState('My properties')
  const dashboardBtns = ['My properties', 'My events']

  useEffect(() => {
    if (dashboardTab) {
      setCurrentComponent(dashboardTab)
      setisActive(dashboardTab)
    } else {
      setisActive('My properties')
    }
  }, [])

  const handleClick = (component) => {
    localStorage.setItem('activity', component.value)
    setCurrentComponent(component.value)
    setisActive(component.value)
  }

  return (
    <div className="dashboard-screen ">
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <div className="page-wrapper">
        <h2>Activity</h2>
        <nav>
          {dashboardBtns.map((button, index) => {
            return (
              <button
                key={index}
                className={
                  button === isActive
                    ? 'btn-dashboard btn-active-true'
                    : 'btn-dashboard btn-active-false'
                }
                onClick={(e) => handleClick(e.target)}
                value={button}
              >
                {button}
              </button>
            )
          })}
        </nav>
        <div className="comps-to-render">
          {currentComponent === 'My properties' ? (
            <MyProperties />
          ) : (
            <MyEvents />
          )}
        </div>
      </div>
    </div>
  )
}
