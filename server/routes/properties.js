import express from 'express'

import {
  getProperties,
  createProperty,
  getProperty,
  updateProperty,
  bookProperty,
  getPropertiesAdmin,
  makePayment,
  getLikes,
  filterPriceAsc,
  filterPriceDesc,
  filterLessRecent,
  filterMostRecent,
  filterPriceRange,
  filterSurface,
} from '../controllers/properties.js'

const router = express.Router()

router.get('/', getProperties)
router.post('/admin', getPropertiesAdmin)
router.get('/:id', getProperty)
router.post('/', createProperty)
router.put('/:id', updateProperty)
router.put('/book/:id', bookProperty)
router.post('/stripe', makePayment)
router.post('/likes', getLikes)

router.get('/filter/price-asc', filterPriceAsc)
router.get('/filter/price-desc', filterPriceDesc)
router.get('/filter/most-recent', filterLessRecent)
router.get('/filter/less-recent', filterMostRecent)
router.post('/filter/price-range', filterPriceRange)
router.post('/filter/surface', filterSurface)

export default router
