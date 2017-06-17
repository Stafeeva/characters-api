const server = require('./src/server.js')

server.app.listen(3000, () => {
  console.log('API running on port 3000')
})
