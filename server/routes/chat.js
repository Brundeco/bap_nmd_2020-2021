import express from 'express'

import {
  getMessages,
  postMessage,
  getMessageByConversationId,
  createConversationId,
  deleteConversations
} from '../controllers/chat.js'

const router = express.Router()

router.get('/:user', getMessages)
router.get('/filter/:conversation_id', getMessageByConversationId)
router.post('/', postMessage)
router.post('/conversation_id', createConversationId)
router.delete('/:id', deleteConversations)

export default router
