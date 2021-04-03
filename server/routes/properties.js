import express from 'express'

import {
  getProperties,
  createProperty,
  getProperty,
  updateProperty,
  bookProperty,
  getPropertiesAdmin,
  makePayment,
} from '../controllers/properties.js'

const router = express.Router()

router.get('/', getProperties)
router.post('/admin', getPropertiesAdmin)
router.get('/:id', getProperty)
router.post('/', createProperty)
router.put('/:id', updateProperty)
router.put('/book/:id', bookProperty)
router.post('/stripe', makePayment)

export default router
