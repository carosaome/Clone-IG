import express from "express"
import 'dotenv/config'
import morgan from "morgan"
import Handlebars from "handlebars"
import {engine} from "express-handlebars"
import {route} from "./routes/index.js"
import { connect } from "./config/db/index.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import cookieParser from "cookie-parser"
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"

const app = new express()
const port = 9999
const server = createServer()
const io = new Server(server, {
    cors: {
        origin: "http://http://localhost:9999/",
        methods: ["GET", "POST"]
    }
});

app.engine('hbs', engine({
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(express.static('src/public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY))




io.on("connection", (socket) => {
    console.log(socket.id);
  });


// HTTP logger
// app.use(morgan('combined'))

app.set('view engine','hbs') 
app.set('views','src/resources/views')
app.get('/', (req, res) => {
    res.send('Home Page')
})

route(app)

connect()
server.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


