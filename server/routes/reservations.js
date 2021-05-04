import express from 'express'

import {
  createReservation,
  getReservations,
  getReservation,
  getCustomerReservation,
  getCustomerReservations,
} from '../controllers/reservations.js'

const router = express.Router()

router.get('/:id', getReservations)
router.get('/detail/:id', getReservation)
router.post('/', createReservation)

router.get('/customer/:id', getCustomerReservations)
router.get('/customer/detail/:id', getCustomerReservation)

export default router
