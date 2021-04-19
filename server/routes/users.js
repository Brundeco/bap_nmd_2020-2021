import express from 'express'

import {
  register,
  login,
  likeEvent,
  getUser,
  likeProperty,
  passwordReset,
  passwordUpdate,
} from '../controllers/users.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/:id', getUser)

router.put('/like-event/:id', likeEvent)
router.put('/like-property/:id', likeProperty)

router.post('/password-reset-link', passwordReset)
router.get('/password-update/:token', passwordUpdate)

export default router
