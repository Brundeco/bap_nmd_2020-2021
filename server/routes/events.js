import express from 'express'

import {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  getEventsAdmin,
  getLikes,
  // filterDateRange,
  filterLessRecent,
  filterMostRecent,
  filterGetAutocomplete,
  filterPostAutocomplete,
} from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.post('/admin', getEventsAdmin)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)
router.post('/likes', getLikes)

// router.post('/filter/date-range', filterDateRange)
router.get('/filter/most-recent', filterMostRecent)
router.get('/filter/less-recent', filterLessRecent)
router.get('/filter/get/autocomplete', filterGetAutocomplete)
router.post('/filter/post/autocomplete', filterPostAutocomplete)
// router.get('/filter/price-asc', filterPriceAsc)
// router.get('/filter/price-desc', filterPriceDesc)

export default router
