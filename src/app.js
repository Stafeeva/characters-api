const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

var characters = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/character', (req, res) => {
  res.json(characters)
})

app.post('/character', (req, res) => {
  var character = req.body
  characters.push(character)
  res.sendStatus(201)
})

exports.app = app
