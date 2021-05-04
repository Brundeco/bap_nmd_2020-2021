import React, { useEffect, useState } from 'react'
import { InputField } from '.'
import {
  filterPriceDesc,
  filterPriceAsc,
  filterPriceRange,
  filterMostRecent,
  filterLessRecent,
  filterSurface,
} from '../functions/PropertyFilterFunctions'
import CloseIcon from './../icons/new-close.svg'
import axios from 'axios'

export default (props) => {
  const [filterMode, setFilterMode] = useState('newest')
  const [priceRange, setPriceRange] = useState()
  const [dateRange, setDateRange] = useState()
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  const [isActive, setisActive] = useState('newest')
  const [showPriceFields, setShowPriceFields] = useState(false)
  const [showDateFields, setShowDateFields] = useState(false)

  const [showOptions, setShowOptions] = useState(false)
  const [optionsValue, setOptionsValue] = useState(50)
  const options = [
    { label: '50 m2', value: 50 },
    { label: '100 m2', value: 100 },
    { label: '200 m2', value: 200 },
    { label: '1000 m2', value: 1000000 },
  ]

  const handleChange = (name, value) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }))
  }

  const handleDaterange = (name, value) => {
    setDateRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    async (e) => {
      if (filterMode === 'newest') {
        setisActive('newest')
        const propsFiltered = await filterMostRecent()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'oldest') {
        setisActive('oldest')
        const propsFiltered = await filterLessRecent()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'priceasc') {
        setisActive('priceasc')
        const propsFiltered = await filterPriceAsc()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'pricedesc') {
        setisActive('pricedesc')
        const propsFiltered = await filterPriceDesc()
        setPropertiesFiltered(propsFiltered)
      }
      if (filterMode === 'pricerange') {
        setisActive('pricerange')
        setShowPriceFields(true)
      }
      if (filterMode === 'daterange') {
        setisActive('daterange')
        setShowDateFields(true)
      }
      if (filterMode === 'surface') {
        setisActive('surface')
        setShowOptions(true)
        const propsFiltered = await filterSurface(optionsValue)
        setPropertiesFiltered(propsFiltered)
      }
    },
    [filterMode, priceRange, optionsValue]
  )

  useEffect(async () => {
    if (priceRange?.maxVal && priceRange?.minVal) {
      const propsFiltered = await filterPriceRange(priceRange)
      setPropertiesFiltered(propsFiltered)
    }
  }, [priceRange])

  useEffect(async () => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const startDate = new Date(dateRange.startDate).getTime()
      const endDate = new Date(dateRange.endDate).getTime()
      let newArray = []

      axios
        .get(`${process.env.REACT_APP_API_URL}/properties`)
        .then((res) => {
          let uniques
          res.data.map((item) => {
            item.dates.map((date) => {
              const evtDate = new Date(date).getTime()
              if (evtDate >= startDate && evtDate <= endDate) {
                newArray.push(item)
                uniques = [...new Set(newArray)]
              }
            })
          })
          if (!uniques) {
            setPropertiesFiltered([])
          } else {
            setPropertiesFiltered(uniques)
          }
        })
        .catch((err) => {
          return err
        })
    }
  }, [dateRange])

  const closeForm = (e) => {
    e.preventDefault()
    setShowPriceFields(false)
  }

  const closeDates = (e) => {
    e.preventDefault()
    setShowDateFields(false)
  }

  const closeSelect = (e) => {
    e.preventDefault()
    setShowOptions(false)
  }

  useEffect(() => {
    if (isActive === 'pricerange') setShowOptions(false)
    if (isActive === 'surface') setShowPriceFields(false)
    if (
      isActive === 'newest' ||
      isActive === 'oldest' ||
      isActive === 'priceasc' ||
      isActive === 'pricedesc'
    ) {
      setShowPriceFields(false)
      setShowOptions(false)
    }
  }, [isActive])

  return (
    <div
      className="property-filters"
      filtereddata={props.filtereddata(propertiesFiltered)}
    >
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
        className={isActive === 'priceasc' ? 'active' : ''}
        onClick={() => setFilterMode('priceasc')}
      >
        Price Ascending
      </button>
      <button
        className={isActive === 'pricedesc' ? 'active' : ''}
        onClick={() => setFilterMode('pricedesc')}
      >
        Price Descending
      </button>
      <button
        className={isActive === 'pricerange' ? 'active' : ''}
        onClick={() => setFilterMode('pricerange')}
      >
        Price range
      </button>
      <button
        className={isActive === 'daterange' ? 'active' : ''}
        onClick={() => setFilterMode('daterange')}
      >
        Date range
      </button>
      <button
        className={isActive === 'surface' ? 'active' : ''}
        onClick={() => setFilterMode('surface')}
      >
        Surface
      </button>
      <form className={showPriceFields ? 'show' : 'hide'}>
        <InputField
          name="minVal"
          type="number"
          placeholder="Minimum price"
          onChange={handleChange}
          className="main-input-field"
        />
        <InputField
          name="maxVal"
          type="number"
          placeholder="Maximum price"
          onChange={handleChange}
          className="main-input-field"
        />
        <div className="close-btn" onClick={(e) => closeForm(e)}>
          <img src={CloseIcon} alt="close button" />
        </div>
        {/* <button onClick={(e) => closeForm(e)}>Close filter</button> */}
      </form>

      <form className={showDateFields ? 'show' : 'hide'}>
        <div className="flex">
          <div className="daterange-group">
            <h3>Start date</h3>
            <InputField
              name="startDate"
              type="date"
              onChange={handleDaterange}
              className="main-input-field"
            />
          </div>
          <div className="daterange-group">
            <h3>End date</h3>
            <InputField
              name="endDate"
              type="date"
              onChange={handleDaterange}
              className="main-input-field"
            />
          </div>
        </div>
        <div className="close-btn" onClick={(e) => closeDates(e)}>
          <img src={CloseIcon} alt="close button" />
        </div>
      </form>
      {showOptions ? (
        <div>
          <select
            value={optionsValue}
            onChange={(e) => {
              setOptionsValue(e.currentTarget.value)
            }}
          >
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <div className="close-btn" onClick={(e) => closeSelect(e)}>
            <img src={CloseIcon} alt="close button" />
          </div>
          {/* <button onClick={(e) => closeSelect(e)}>Close filter</button> */}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
