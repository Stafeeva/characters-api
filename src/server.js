const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const indexHtml = fs.readFileSync('public/index.html').toString()

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

//ui routes

app.get('/character/add', (req, res) => {
  res.send(indexHtml)
})

app.get('/character/:name', (req, res) => {
  res.send(indexHtml)
})

var characters = []

//api routes

app.get('/api/character', (req, res) => {
  res.json(characters)
})

app.get('/api/character/:name', (req, res) => {
  const character = req.params.name
  const result = characters.find(c => c.name === character)
  if (!result) {
    res.sendStatus(404)
  } else {
    res.send(result)
  }
})

app.post('/api/character', (req, res) => {
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

app.put('/api/character/:name',  (req, res) => {
  const name = req.params.name
  const characterToUpdate = characters.find(c => c.name === name)
  characterToUpdate.height = req.body.height
  res.sendStatus(200)
})

app.delete('/api/character/:name', (req, res) => {
  const characterToDelete = req.params.name
  characters = characters.filter(character => {
    return character.name !== characterToDelete
  })
  res.sendStatus(200)
})

exports.app = app
exports.getCharacters = () => characters
exports.resetCharacters = () => { characters = [] }
