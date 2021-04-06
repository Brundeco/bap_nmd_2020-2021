import express from 'express'

import {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  getEventsAdmin,
} from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.post('/admin', getEventsAdmin)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)

export default router