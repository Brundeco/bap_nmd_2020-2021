import React, { useState, useEffect } from 'react'
import { Header } from '../../../components'
import LogoutUser from '../../Users/LogoutUser'
// import MyProperties from './MyProperties'
// import MyEvents from './MyEvents'

export default () => {
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
    localStorage.setItem('dashboard', component.value)
    setCurrentComponent(component.value)
    setisActive(component.value)
  }

  return (
    <div className="dashboard-screen ">
      <Header />
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
          {/* {currentComponent === 'properties' ? <MyProperties /> : <MyEvents />} */}
        </div>
      </div>
    </div>
  )
}
