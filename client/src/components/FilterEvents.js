import React, { useEffect, useState } from 'react'
import { InputField, SearchAutoComplete } from '.'
import CloseIcon from './../icons/new-close.svg'
import {
  filterMostRecent,
  filterLessRecent,
} from '../functions/EventFilterFunctions'
import axios from 'axios'

export default (props) => {
  const [filterMode, setFilterMode] = useState('newest')
  const [dateRange, setDateRange] = useState()
  const [eventsFiltered, setEventsFiltered] = useState([])
  const [showDateFields, setShowDateFields] = useState(false)
  const [showSearchField, setShowSearchField] = useState(false)
  const [isActive, setisActive] = useState('newest')

  const handleChange = (name, value) => {
    setDateRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    async (e) => {
      if (filterMode === 'newest') {
        setisActive('newest')
        const eventsFiltered = await filterMostRecent()
        setEventsFiltered(eventsFiltered)
      }
      if (filterMode === 'oldest') {
        setisActive('oldest')
        const eventsFiltered = await filterLessRecent()
        setEventsFiltered(eventsFiltered)
      }
      if (filterMode === 'daterange') {
        setisActive('daterange')
        setShowDateFields(true)
      }
      if (filterMode === 'search') {
        setisActive('search')
        setShowSearchField(true)
      }
    },
    [filterMode]
  )

  const closeForm = (e) => {
    e.preventDefault()
    setShowDateFields(false)
  }

  const closeSearch = (e) => {
    e.preventDefault()
    setShowSearchField(false)
  }

  const handleFilteredEvents = (events) => {
    if (events.length) setEventsFiltered(events)
  }

  useEffect(async () => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const startDate = new Date(dateRange.startDate).getTime()
      const endDate = new Date(dateRange.endDate).getTime()
      let newArray = []
      axios
        .get(`${process.env.REACT_APP_API_URL}/events`)
        .then((res) => {
          let uniques
          res.data.events.map((item) => {
            item.dates.map((date) => {
              const evtDate = new Date(date).getTime()
              if (evtDate >= startDate && evtDate <= endDate) {
                newArray.push(item)
                uniques = [...new Set(newArray)]
              }
            })
          })
          if (!uniques) {
            setEventsFiltered([])
          } else {
            setEventsFiltered(uniques)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [dateRange])

  return (
    <div
      className="event-filters"
      filtereddata={props.filtereddata(eventsFiltered)}
    >
      <button
        className={isActive === 'newest' ? 'active' : ''}
        onClick={() => setFilterMode('newest')}
      >
        Recent
      </button>
      <button
        className={isActive === 'oldest' ? 'active' : ''}
        onClick={() => setFilterMode('oldest')}
      >
        Latest
      </button>
      <button
        className={isActive === 'daterange' ? 'active' : ''}
        onClick={() => setFilterMode('daterange')}
      >
        Date range
      </button>
      <button
        className={isActive === 'search' ? 'active' : ''}
        onClick={() => setFilterMode('search')}
      >
        search
      </button>
      <form className={showDateFields ? 'show' : 'hide'}>
        <div className="flex">
          <div className="daterange-group">
            <h3>Start date</h3>
            <InputField
              name="startDate"
              placeholder="Minimum price"
              type="date"
              onChange={handleChange}
              className="main-input-field"
            />
          </div>
          <div className="daterange-group">
            <h3>End date</h3>
            <InputField
              name="endDate"
              placeholder="Maximum price"
              type="date"
              onChange={handleChange}
              className="main-input-field"
            />
          </div>
        </div>
        <div className="close-btn" onClick={(e) => closeForm(e)}>
          <img src={CloseIcon} alt="close button" />
        </div>
      </form>

      {showSearchField ? (
        <div className="search show">
          <SearchAutoComplete events={handleFilteredEvents} />
          <div className="close-btn" onClick={(e) => closeSearch(e)}>
            <img src={CloseIcon} alt="close button" />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
