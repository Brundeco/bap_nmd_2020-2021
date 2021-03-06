import express from 'express'

import {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  getEventsAdmin,
  getLikes,
  filterLessRecent,
  filterMostRecent,
  filterGetAutocomplete,
  filterPostAutocomplete,
  deleteEvents,
  deleteEvent,
} from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.post('/admin', getEventsAdmin)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)
router.post('/likes', getLikes)

router.get('/filter/most-recent', filterMostRecent)
router.get('/filter/less-recent', filterLessRecent)
router.get('/filter/get/autocomplete', filterGetAutocomplete)
router.post('/filter/post/autocomplete', filterPostAutocomplete)
router.delete('/delete/:id', deleteEvent)
router.delete('/:id', deleteEvents)

export default router
