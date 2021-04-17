import React, { useEffect, useState } from 'react'
import { InputField } from '.'
import {
  filterPriceDesc,
  filterPriceAsc,
  filterPriceRange,
  filterMostRecent,
  filterLessRecent,
} from './../functions/PropertyFilters'

export default (props) => {
  const [filterMode, setFilterMode] = useState('newest')
  const [priceRange, setPriceRange] = useState()
  const [togglePriceRange, setTogglePriceRange] = useState(false)
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  const [isActive, setisActive] = useState('newest')
  const [formValid, setFormValid] = useState(false)
  const [showPriceFields, setShowPriceFields] = useState(false)

  const handleChange = (name, value) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(
    async (e) => {
      if (filterMode === 'newest') {
        const propsFiltered = await filterMostRecent()
        setPropertiesFiltered(propsFiltered)
        setisActive('newest')
      }
      if (filterMode === 'oldest') {
        const propsFiltered = await filterLessRecent()
        setPropertiesFiltered(propsFiltered)
        setisActive('oldest')
      }
      if (filterMode === 'priceasc') {
        const propsFiltered = await filterPriceAsc()
        setPropertiesFiltered(propsFiltered)
        setisActive('priceasc')
      }
      if (filterMode === 'pricedesc') {
        const propsFiltered = await filterPriceDesc()
        setPropertiesFiltered(propsFiltered)
        setisActive('pricedesc')
      }
      if (filterMode === 'pricerange') {
        // const propsFiltered = await filterPriceRange(priceRange)
        // setPropertiesFiltered(propsFiltered)
        setShowPriceFields(true)
        setisActive('pricerange')
      }
    },
    [filterMode, togglePriceRange]
  )

  useEffect(async () => {
    if (priceRange?.maxVal && priceRange?.minVal) {
      const propsFiltered = await filterPriceRange(priceRange)
      setPropertiesFiltered(propsFiltered)
    }
  }, [priceRange])

  // Create seperate function for range filtering because form behaviour needs be changed to preventDefault()
  // Create a rangeToggle state to be able to call function multiple times (since setFilterMode's value will not change)
  //   const filterByPriceRange = (e) => {
  //     e.preventDefault()
  //     setTogglePriceRange(!togglePriceRange)
  //     setFilterMode('pricerange')
  //   }

  return (
    <div filtereddata={props.filtereddata(propertiesFiltered)}>
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
      <form className={showPriceFields ? 'show' : 'hide'}>
        <InputField
          name="minVal"
          placeholder="Minimum price"
          type="number"
          onChange={handleChange}
          className="main-input-field"
        />
        <InputField
          name="maxVal"
          placeholder="Maximum price"
          type="number"
          onChange={handleChange}
          className="main-input-field"
        />
        <p onClick={() => setShowPriceFields(false)}>Close filter</p>
      </form>
    </div>
  )
}
