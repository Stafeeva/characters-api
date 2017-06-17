const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var characters = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/character', (req, res) => {
  res.json(characters)
})

exports.app = app
