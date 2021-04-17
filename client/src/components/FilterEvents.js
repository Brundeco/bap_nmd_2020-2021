import React, { useEffect, useState } from 'react'
import { InputField } from '.'
import {
  // filterPriceDesc,
  // filterPriceAsc,
  filterDateRange,
  filterMostRecent,
  filterLessRecent,
} from './../functions/EventFilters'

export default (props) => {
  const [filterMode, setFilterMode] = useState('newest')
  const [dateRange, setDateRange] = useState()
  const [eventsFiltered, setEventsFiltered] = useState([])
  const [showDateFields, setShowDateFields] = useState(false)
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
        console.log(eventsFiltered)
        setEventsFiltered(eventsFiltered)
      }
      if (filterMode === 'daterange') {
        setisActive('daterange')
        setShowDateFields(true)
      }
    },
    [filterMode]
  )

  useEffect(async () => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const eventsFiltered = await filterDateRange(dateRange)
      console.log(eventsFiltered)
      setEventsFiltered(() => eventsFiltered)
      // setEventsFiltered(eventsFiltered)
    }
  }, [dateRange])

  const closeForm = (e) => {
    e.preventDefault()
    setShowDateFields(false)
  }

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
    </div>
  )
}
