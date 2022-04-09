import express from "express"
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import Handlebars from "handlebars"
import {engine} from "express-handlebars"
import {route} from "./routes/index.js"
import { connect } from "./config/db/index.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import cookieParser from "cookie-parser"
const app = new express()
const port = 9999

// HTTP logger
// app.use(morgan('combined'))
app.engine('hbs', engine({
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(express.static('src/public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_KEY))

app.set('view engine','hbs') 
app.set('views','src/resources/views')

route(app)

connect()

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


