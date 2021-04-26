// const env = require('dotenv').config()
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

const app = express()

// bodyParser middleware
// app.use(bodyParser.json())
app.use(express.json())

/*
app.use(bodyParser.json({limit:'30mb',extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}))
*/


//Use routes
app.use('/api/blogs', require('./routes/api/blogs'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


app.route('*')
    .get((req, res) => {
        res.status(501).json({ msg: 'not implemented' })
    })

// DB config
const db = config.get('mongoURI')
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`\n\n\nserver running on port: ${PORT}\n\n\n\n`)))
    .catch((err) => console.log(err))