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
  const [priceRange, setPriceRange] = useState()
  const [toggleDateRange, setToggleDateRange] = useState(false)
  const [eventsFiltered, setEventsFiltered] = useState([])

  const handleChange = (name, value) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    async (e) => {
      // if (filterMode === 'priceasc') {
      //   const propsFiltered = await filterPriceAsc()
      //   setEventsFiltered(propsFiltered)
      // }
      // if (filterMode === 'pricedesc') {
      //   const propsFiltered = await filterPriceDesc()
      //   setEventsFiltered(propsFiltered)
      // }
      if (filterMode === 'daterange') {
        // console.log(priceRange)
        const propsFiltered = await filterDateRange(priceRange)
        setEventsFiltered(propsFiltered)
      }
      if (filterMode === 'newest') {
        const propsFiltered = await filterMostRecent()
        setEventsFiltered(propsFiltered)
      }
      if (filterMode === 'oldest') {
        const propsFiltered = await filterLessRecent()
        setEventsFiltered(propsFiltered)
      }
    },
    [filterMode, toggleDateRange]
  )

  // Create seperate function for range filtering because form behaviour needs be changed to preventDefault()
  // Create a rangeToggle state to be able to call function multiple times (since setFilterMode's value will not change)
  const filterByDateRange = (e) => {
    e.preventDefault()
    setToggleDateRange(!toggleDateRange)
    setFilterMode('daterange')
  }

  return (
    <div filtereddata={props.filtereddata(eventsFiltered)}>
      <button onClick={() => setFilterMode('newest')}>Newest</button>
      <button onClick={() => setFilterMode('oldest')}>Oldest</button>
      <button onClick={() => setFilterMode('priceasc')}>Price Ascending</button>
      <button onClick={() => setFilterMode('pricedesc')}>
        Price Descending
      </button>
      <form>
        <InputField
          name="startDate"
          placeholder="Start date"
          type="date"
          onChange={handleChange}
          className="main-input-field"
          required
        />
        <InputField
          name="endDate"
          placeholder="End date"
          type="date"
          onChange={handleChange}
          className="main-input-field"
          required
        />

        <button onClick={(e) => filterByDateRange(e)}>
          Filter by date range
        </button>
        <br />
        <br />
      </form>
    </div>
  )
}
