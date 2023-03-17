// load env variables
require('dotenv').config()

// connect to database
require('./config/db')()

// express
const express = require('express')
const app = express()
const cors = require('cors')

// socket.io
const { createServer } = require('http')
const { Server } = require('socket.io')
const User = require('./models/User')
const {
  getLastMessagesFromRoom,
  sortRoomMessagesByDate,
} = require('./helpers/roomHelpers')
const Message = require('./models/Message')
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3000
const rooms = ['General', 'Technology', 'Gaming', 'Finance']

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes/userRoutes'))

app.get('/api/rooms', (req, res) => {
  res.json(rooms)
})

// socket connection
io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find()
    io.emit('new-user', members)
  })

  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom)
    socket.leave(previousRoom)
    let roomMessages = await getLastMessagesFromRoom(newRoom)
    roomMessages = sortRoomMessagesByDate(roomMessages)
    socket.emit('room-messages', roomMessages)
  })

  socket.on('message-room', async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    })
    let roomMessages = await getLastMessagesFromRoom(room)
    roomMessages = sortRoomMessagesByDate(roomMessages)
    io.to(room).emit('room-messages', roomMessages)
    socket.broadcast.emit('notifications', room)
  })

  app.delete('/api/logout', async (req, res) => {
    try {
      const { _id, newMessages } = req.body
      const user = await User.findById(_id)
      user.status = 'offline'
      user.newMessages = newMessages
      await user.save()
      const members = await User.find()
      socket.broadcast.emit('new-user', members)
      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(400).send()
    }
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening to port ${PORT} `)
})
