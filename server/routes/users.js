import express from 'express'

import {
  register,
  login,
  likeEvent,
  getUser,
  likeProperty,
} from '../controllers/users.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/:id', getUser)
router.put('/like-event/:id', likeEvent)
router.put('/like-property/:id', likeProperty)

export default router
