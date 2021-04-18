import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {
  filterGetAutocomplete,
  filterPostAutocomplete,
} from '../functions/EventFilterFunctions'

export default (props) => {
  const [searchValues, setSearchValues] = useState()
  const [eventTitles, setEventTitles] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(async () => {
    const searchValues = await filterGetAutocomplete()
    setSearchValues(searchValues)
  }, [])

  useEffect(() => {
    searchValues?.map((item) => {
      setEventTitles((prev) => [...prev, { title: item.title }])
    })
  }, [searchValues])

  const handleOnSelect = async (string) => {
    const events = await filterPostAutocomplete(string.title)
    setFilteredEvents(events)
  }
  return (
    <div className="search-author" events={props.events(filteredEvents)}>
      <ReactSearchAutocomplete
        items={eventTitles}
        placeholder="Search on event title"
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ['title'] }}
        resultStringKeyName="title"
        autoFocus
      />
    </div>
  )
}
