import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import Server from 'socket.io'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import propertyRoutes from './routes/properties.js'
import userRoutes from './routes/users.js'
import chatRoutes from './routes/chat.js'
import reservationRoutes from './routes/reservations.js'
import mailingRoutes from './routes/mailing.js'

const app = express()
app.use(cors())
dotenv.config()

const server = http.createServer(app)
const socketio = new Server(server)

app.get('/', (req, res) => {
  res.send('Index.js was restructured')
})

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

let userList = []

socketio.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('registration', (id) => {
    console.log(id)
    userList.push({ sid: socket.id, id: id })
    // console.log(userList)
  })

  socket.on('new-message', (data) => {
    console.log(data)
    let obj = userList.find((o) => o.id === parseInt(data.id))
    if (obj) socketio.to(obj.sid).emit('receive-message', data.message)
  })

  socket.on('disconnect', () => {
    // console.log('User left')
  })
})

app.use('/auth', authRoutes)
app.use('/events', eventRoutes)
app.use('/properties', propertyRoutes)
app.use('/users', userRoutes)
app.use('/messages', chatRoutes)
app.use('/reservations', reservationRoutes)
app.use('/mailing', mailingRoutes)

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
    server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
