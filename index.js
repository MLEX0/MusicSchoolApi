const express = require('express');
const http = require('http');

const bodyParser = require('body-parser')
const passport = require('passport')
const userRouter = require('./routes/user.routes')
const chatRouter = require('./routes/chat.routes')
const authRouter = require('./routes/auth.routes')
const scheduleRouter = require('./routes/schedule.routes')
const markRouter = require('./routes/mark.routes')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("NEW_MESSAGE",(msg) => {

        console.log("get new message")
        io.emit("NEW_MESSAGE", msg)
    })
});


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use('/uploads', passport.authenticate('jwt', {session:false}) ,express.static('uploads'))
//app.use(require('cors'))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/schedule', scheduleRouter)
app.use('/api/mark', markRouter)

server.listen(PORT, () => {
    console.log('server started on', PORT);
})