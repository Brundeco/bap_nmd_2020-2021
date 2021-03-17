import Messages from '../models/messages.js'

export const getMessages = async (req, res) => {
  console.log(req.params.user)

  try {
    const conversations = await Messages.find({
      conversationId: { $regex: req.params.user, $options: 'i' },
    })
    res.status(200).json(conversations)
  } catch (err) {
    console.log(err)
  }
}

export const getMessageByConversationId = async (req, res) => {
  console.log(req.params.conversation_id)

  try {
    const conversations = await Messages.find({
      conversationId: {
        $in: [req.params.conversation_id],
      },
    })
    res.status(200).json(conversations)
  } catch (err) {
    console.log(err)
  }
}

export const postMessage = async (req, res) => {
  let message = new Messages()
  const fromTo = `${req.body.from}_${req.body.to}`
  const toFrom = `${req.body.to}_${req.body.from}`
  let newConversationId = fromTo

  try {
    await Messages.findOne({
      conversationId: fromTo,
    })
      .then((res) =>
        res == null ? null : (newConversationId = res.conversationId)
      )
      .catch((err) => console.log(err))

    await Messages.findOne({
      conversationId: toFrom,
    })
      .then((res) =>
        res == null ? null : (newConversationId = res.conversationId)
      )
      .catch((err) => console.log(err))

    message = new Messages({
      conversationId: newConversationId,
      from: req.body.from,
      fromName: req.body.fromName,
      to: req.body.to,
      toName: req.body.toName,
      message: req.body.message,
      conversationNameStr: req.body.conversationNameStr,
    })
    await message.save()
    res.status(201).json(message)
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message })
  }
}
