import express from 'express'

import {
  register,
  login,
  deleteUser,
  likeEvent,
  getUser,
  likeProperty,
  passwordReset,
  passwordUpdate,
  saveNewPassword,
} from '../controllers/users.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

router.put('/like-event/:id', likeEvent)
router.put('/like-property/:id', likeProperty)

router.post('/password-reset', passwordReset)
router.get('/password-reset/:token', passwordUpdate)
router.put('/password-reset/:username/:password', saveNewPassword)

export default router
