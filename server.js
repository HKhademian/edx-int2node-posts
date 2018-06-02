const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorhandler = require('errorhandler')

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

const routes = require('./routes')
app.use('/posts', routes.posts)

app.all((req, res) => {
	return res.sendStatus(404)
})

app.listen(3000)
console.log('Server is running at http://localhost:3000/')
