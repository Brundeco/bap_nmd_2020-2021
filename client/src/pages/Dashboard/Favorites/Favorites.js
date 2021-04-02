import React, { useState, useEffect } from 'react'
import { CheckSession, Header } from '../../../components'
import FavProperties from './FavProperties'
import FavEvents from './FavEvents'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [currentComponent, setCurrentComponent] = useState('favorites')
  const dashboardTab = localStorage.getItem('dashboard')
  const [isActive, setisActive] = useState('favorites')
  const dashboardBtns = ['properties', 'events']

  useEffect(() => {
    if (dashboardTab) {
      setCurrentComponent(dashboardTab)
      setisActive(dashboardTab)
    } else {
      setisActive('favorites')
    }
  }, [])

  const handleClick = (component) => {
    console.log(component)
    localStorage.setItem('dashboard', component.value)
    setCurrentComponent(component.value)
    setisActive(component.value)
  }

  return (
    <div className="dashboard-screen ">
      <Header />
      <div className="page-wrapper">
        <h2>Favorites</h2>
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
          {currentComponent === 'properties' ? (
            <FavProperties />
          ) : (
            <FavEvents />
          )}
        </div>
      </div>
    </div>
  )
}
