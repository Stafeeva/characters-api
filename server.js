const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

var characters = [
    {
        name: "Luke Skywalker",
        height: 172,
        mass: 77,
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        is_male: true
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/characters', (req, res) => {
  console.log('listing characters')
  res.json(characters)
})

app.post('/characters', (req, res) => {
  characters.push(req.body)
  res.sendStatus(201)
})

app.listen(3000, () => {
  console.log('API running on port 3000')
})
