import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import * as io from 'socket.io'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import propertyRoutes from './routes/properties.js'
import userRoutes from './routes/users.js'
import chatRoutes from './routes/chat.js'

import { addUser, removeUser, getUser, getUsersInRoom } from './socket/users.js'

const app = express()
const server = http.createServer(app)
const socketio = new io.Server(server)

socketio.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)
    // console.log(recepient, id)
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    socketio.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    // callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socketio.id)

    io.to(user.room).emit('message', { user: user.name, text: message })
    // callback()
  })

  socket.on('leave', () => {
    // console.log('User had left')
  })
})

dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/auth', authRoutes)
app.use('/events', eventRoutes)
app.use('/properties', propertyRoutes)
app.use('/users', userRoutes)
app.use('/messages', chatRoutes)

const CONNECTION_URL = `mongodb+srv://Bruno:${process.env.MONGODB_PASSWORD}@cluster0.2gkzu.mongodb.net/<dbname>?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
