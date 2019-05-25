
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const db = mongoose.connection

mongoose.connect('mongodb://localhost/databasename',{useNewUrlParser:true})
app.use(express.json())

db.on('error',(error) => console.error(error))
db.once(`open`, () => console.log(`Connected to DB`))

const modelRouter = require(`../routes/model.route.js`)
app.use(`/subscribers`, modelRouter)


app.listen(port, ()=> console.log(`Listen on ${port}`))
