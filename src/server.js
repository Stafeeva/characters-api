const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

var characters = []

app.get('/character', (req, res) => {
  res.json(characters)
})

app.post('/character', (req, res) => {
  var character = req.body

  if (character.name == undefined) {
    res.sendStatus(400)
  }
  else if (characters.find(c => c.name === character.name)) {
    res.sendStatus(400)
  }
  else {
    characters.push(character)
    res.sendStatus(201)
  }
})

exports.app = app
exports.getCharacters = () => characters
exports.resetCharacters = () => { characters = [] }
