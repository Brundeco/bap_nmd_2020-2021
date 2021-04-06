import express from 'express'

import {
  sendMail,
} from '../controllers/mailing.js'

const router = express.Router()

router.post('/', sendMail)

export default router
