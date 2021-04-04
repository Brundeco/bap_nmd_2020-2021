import express from 'express'

import {
  createReservation,
  getReservations,
} from '../controllers/reservations.js'

const router = express.Router()

router.get('/:id', getReservations)
router.post('/', createReservation)

export default router
