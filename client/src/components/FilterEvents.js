import React, { useEffect, useState } from 'react'
import { InputField, SearchAutoComplete } from '.'
import {
  filterDateRange,
  filterMostRecent,
  filterLessRecent,
} from '../functions/EventFilterFunctions'

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

  useEffect(() => {
    console.log('changes detected')
    console.log(eventsFiltered)
  }, [eventsFiltered])

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

  // useEffect(async () => {
  //   if (dateRange?.startDate && dateRange?.endDate) {
  //     const eventsFiltered = await filterDateRange(dateRange)
  //     console.log(eventsFiltered)
  //     setEventsFiltered(() => eventsFiltered)
  //     // setEventsFiltered(eventsFiltered)
  //   }
  // }, [dateRange])

  return (
    <div filtereddata={props.filtereddata(eventsFiltered)}>
      <button
        className={isActive === 'newest' ? 'active' : ''}
        onClick={() => setFilterMode('newest')}
      >
        Newest
      </button>
      <button
        className={isActive === 'oldest' ? 'active' : ''}
        onClick={() => setFilterMode('oldest')}
      >
        Oldest
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
        <InputField
          name="startDate"
          placeholder="Minimum price"
          type="date"
          onChange={handleChange}
          className="main-input-field"
        />
        <InputField
          name="endDate"
          placeholder="Maximum price"
          type="date"
          onChange={handleChange}
          className="main-input-field"
        />
        <button onClick={(e) => closeForm(e)}>Close filter</button>
      </form>
      {/* <div className={showSearchField ? 'show' : 'hide'}>
        <SearchAutoComplete events={handleFilteredEvents} />
        <button onClick={(e) => closeSearch(e)}>Close search</button>
      </div> */}

      {showSearchField ? (
        <div className="search">
          <SearchAutoComplete events={handleFilteredEvents} />
          <button onClick={(e) => closeSearch(e)}>Close search</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
