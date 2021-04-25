import express from 'express'

import {
  createReservation,
  getReservations,
  getReservation,
} from '../controllers/reservations.js'

const router = express.Router()

router.get('/:id', getReservations)
router.get('/detail/:id', getReservation)
router.post('/', createReservation)

export default router
