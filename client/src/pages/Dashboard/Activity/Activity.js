import React, { useState, useEffect } from 'react'
import { CheckSession, Header } from '../../../components'
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
    <React.Fragment>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
      <div className="activity-screen">
        <section>
          <div className="event-filters flex flex-j-center">
            {dashboardBtns.map((button, index) => {
              return (
                <button
                  key={index}
                  className={button === isActive ? 'active' : ''}
                  onClick={(e) => handleClick(e.target)}
                  value={button}
                >
                  {button}
                </button>
              )
            })}
          </div>
        </section>
        <section className="activity-component">
          {currentComponent === 'My properties' ? (
            <MyProperties />
          ) : (
            <MyEvents />
          )}
        </section>
      </div>
    </React.Fragment>
  )
}
