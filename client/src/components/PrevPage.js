import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { FontAwesome } from '.'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import SearchIcon from './../icons/search.svg'
import RadiusIcon from './../icons/radius.svg'

export default (props) => {
  const location = useLocation()
  const history = useHistory()
  const [showOptions, setShowOptions] = useState(false)
  let currentPath = location.pathname
  const [optionsValue, setOptionsValue] = useState(
    localStorage.getItem('radius') || 5
  )
  const options = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '15 km', value: 15 },
    { label: '30 km', value: 30 },
    { label: 'everywhere', value: 100000 },
  ]

  const handleClick = () => {
    if (history.location.pathname.includes('login')) return
    history.goBack()
  }

  if (
    currentPath === '/' ||
    currentPath.includes('events') ||
    currentPath.includes('properties')
  )
    return (
      <div
        className="menu-actions-homepage"
        radius={props.radius(optionsValue)}
      >
        <div className="search">
          <img src={SearchIcon} />
        </div>
        <div className="radius" onClick={() => setShowOptions(!showOptions)}>
          <img src={RadiusIcon} />
        </div>
        {props.locationsharing ? (
          <div className={showOptions ? ' show-menu' : 'hide-menu'}>
            <label>Select radius</label>
            <select
              value={optionsValue}
              onChange={(e) => {
                setOptionsValue(e.currentTarget.value)
                localStorage.setItem('radius', e.currentTarget.value)
              }}
            >
              {options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <h3>Enable geolocation for better use of the app</h3>
        )}
      </div>
    )

  return (
    <div className="prev-page-component" onClick={handleClick}>
      <FontAwesome icon={faChevronLeft} />
    </div>
  )
}
