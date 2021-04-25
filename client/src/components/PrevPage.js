import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { FontAwesome } from '.'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import SearchIcon from './../icons/search.svg'
import CloseIcon from './../icons/close_white.svg'
import RadiusIcon from './../icons/radius.svg'
import FilterIcon from './../icons/filter.svg'

export default (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentPath = location.pathname
  const [showFilters, setShowFilters] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
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

  if (currentPath === '/')
    return (
      <div
        className="menu-actions-homepage"
        radius={props.radius(optionsValue)}
      >
        <div
          className={showOptions ? 'radius-edit' : 'radius'}
          onClick={() => setShowOptions(!showOptions)}
        >
          <img src={RadiusIcon} />
        </div>
        {props.locationsharing ? (
          // <div className={true ? ' show-menu' : 'hide-menu'}>
          <div className={showOptions ? ' show-menu' : 'hide-menu'}>
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
          ''
        )}
      </div>
    )

  return (
    <React.Fragment>
      <div
        className="prev-page-component menu-actions-homepage"
        radius={props.radius(optionsValue)}
        onClick={handleClick}
        showfilters={props.showfilters(showFilters)}
      >
        <FontAwesome icon={faChevronLeft} />
      </div>
      {history.location.pathname.includes('events') ||
      history.location.pathname.includes('properties') ? (
        <div
          className={!showFilters ? 'search' : 'search active'}
          onClick={() => setShowFilters(!showFilters)}
        >
          {!showFilters ? <img src={FilterIcon} /> : <img src={CloseIcon} />}
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
