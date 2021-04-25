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
    <div>
      <Header
        locationsharing={() => {}}
        radius={() => {}}
        showfilters={() => {}}
      />
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
      <section>
        {currentComponent === 'My properties' ? <MyProperties /> : <MyEvents />}
      </section>
    </div>
  )
}
