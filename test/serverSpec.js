const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app.js').app
const should = chai.should()

chai.use(chaiHttp)

describe('app', () => {
  describe('GET /', () => {
    it("should return 'Hello World!'", done => {
      chai.request(app)
          .get('/')
          .end((err, res) => {
            res.should.have.status(200)
            res.text.should.equal('Hello World!')
            done()
          })
    })
  })

  describe('GET /character', () => {
    it('should return an empty list', done => {
      chai.request(app)
          .get('/character')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.length(0)
            done()
          })
    })
  })
})
