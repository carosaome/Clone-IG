import express from "express"
import 'dotenv/config'
import morgan from "morgan"
import Handlebars from "handlebars"
import { engine } from "express-handlebars"
import { route } from "./routes/index.js"
import { connect } from "./config/db/index.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import cookieParser from "cookie-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"
import converstations from "./app/models/converstations.js"
const app = new express()
const port = 9999
app.engine('hbs', engine({
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(express.static('src/public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY))
// HTTP logger
// app.use(morgan('combined'))
app.set('view engine', 'hbs')
app.set('views', 'src/resources/views')


const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
route(app)

io.on('connection', (socket) => {
    // send and get Comment
    socket.on('comment', cmt => {
      io.emit('comment', cmt);
    });
   
    // send and get message
    socket.on('send-message', (data)=>{
        let  roomId = data.converstationId
        io.to(roomId).emit('getMessage', data)

    })
    // join room
    socket.on('join-room', (roomId)=>{
        console.log('user join room ' + roomId)
        socket.join(roomId)
    })

    socket.on("disconnect", () => {
        console.log('disconnect');
    });
    
  });

connect()
server.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


