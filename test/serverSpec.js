const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app.js').app
const expect = chai.expect

chai.use(chaiHttp)

describe('app', () => {
  describe('GET /', () => {
    it("should return 'Hello World!'", done => {
      chai.request(app)
          .get('/')
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.text).to.equal('Hello World!')
            done()
          })
    })
  })

  describe('GET /character', () => {
    it('should return an empty list', done => {
      chai.request(app)
          .get('/character')
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(0)
            done()
          })
    })
  })
})
