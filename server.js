const express = require('express')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db.js')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const port = process.env.PORT 

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/horoscopo', require('./routes/HoroscopoRoutes.js')) 
app.use('/api/users', require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor inicado en el puerto ${port}`))