const server = require('./src/server.js')
const characters = require('./characters.json').characters

server.setCharacters(characters)

server.app.listen(3000, () => {
  console.log('API running on port 3000')
})
