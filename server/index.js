const express = require("express");
const http = require("http");
const socketIo = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: "*"
    },    
})

const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

io.on("connection", (socket) => {

    console.log(`Client ${socket.io} connected`)

    const { roomId } = socket.handshake.query
    socket.join(roomId)

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    socket.on("disconnect", () => {
        console.log(`Client ${socket.io} disconnected`)
        socket.leave(roomId)
    })

})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
