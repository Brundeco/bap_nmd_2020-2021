import React, { useState, useEffect } from 'react'
import { CheckSession, Header } from '../../../components'
import FavProperties from './FavProperties'
import FavEvents from './FavEvents'

export default () => {
  CheckSession(localStorage.getItem('jwt'))
  const [currentComponent, setCurrentComponent] = useState('properties')
  const dashboardTab = localStorage.getItem('favs')
  const [isActive, setisActive] = useState('properties')
  const dashboardBtns = ['properties', 'events']

  useEffect(() => {
    if (dashboardTab) {
      setCurrentComponent(dashboardTab)
      setisActive(dashboardTab)
    } else {
      setisActive('properties')
    }
  }, [])

  const handleClick = (component) => {
    localStorage.setItem('favs', component.value)
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
        {currentComponent === 'properties' ? <FavProperties /> : <FavEvents />}
      </section>
    </div>
  )
}
