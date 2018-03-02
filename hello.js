#!/usr/bin/env node
const http = require('http')
const bodyparser = require('body-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

const {
  PORT = 8080,
  NODE_ENV = 'development',
} = process.env

app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(helmet())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/greet/:person?', (req, res) => {
  const {person = 'world'} = req.params
  res.send(`Hello, ${person}`)
})

const server = http.createServer(app)

server.listen(PORT, () => 
  console.log(`Server running at http://localhost:${PORT}/`)
)
