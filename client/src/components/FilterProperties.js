import React, { useEffect, useState } from 'react'
import { InputField } from '.'
import {
  filterPriceDesc,
  filterPriceAsc,
  filterPriceRange,
  filterMostRecent,
  filterLessRecent,
  filterSurface,
} from './../functions/PropertyFilters'

export default (props) => {
  const [filterMode, setFilterMode] = useState('newest')
  const [priceRange, setPriceRange] = useState()
  const [propertiesFiltered, setPropertiesFiltered] = useState([])
  const [isActive, setisActive] = useState('newest')
  const [showPriceFields, setShowPriceFields] = useState(false)

  const [showOptions, setShowOptions] = useState(false)
  const [optionsValue, setOptionsValue] = useState()
  const options = [
    { label: 'Select', value: 2000 },
    { label: '50 m2', value: 50 },
    { label: '100 m2', value: 100 },
    { label: '200 m2', value: 200 },
    { label: '1000 m2', value: 1000 },
  ]

  const handleChange = (name, value) => {
    setPriceRange((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    console.log(optionsValue)
  }, [optionsValue])

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

  const closeForm = (e) => {
    e.preventDefault()
    setShowPriceFields(false)
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
      <button
        className={isActive === 'surface' ? 'active' : ''}
        onClick={() => setFilterMode('surface')}
      >
        Surface
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
        <button onClick={(e) => closeForm(e)}>Close filter</button>
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
          <button onClick={(e) => closeSelect(e)}>Close filter</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
