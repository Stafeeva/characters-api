const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/characters', (req, res) => {
  res.send('List of characters to go here')
})

app.listen(3000, () => {
  console.log('API running on port 3000')
})
