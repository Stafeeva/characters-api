const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

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

app.delete('/character/:name', (req, res) => {
  const characterToDelete = req.params.name
  characters = characters.filter(character => {
    return character.name !== characterToDelete
  })
  res.sendStatus(200)
})

exports.app = app
exports.getCharacters = () => characters
exports.resetCharacters = () => { characters = [] }
