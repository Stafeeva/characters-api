const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app.js').app
const expect = chai.expect

chai.use(chaiHttp)

describe('app', () => {
  describe('GET /', () => {
    it("returns 'Hello World!'", done => {
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
    it('returns an empty list', done => {
      chai.request(app)
          .get('/character')
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(0)
            done()
          })
    })
  })

  describe('POST /character', () => {
    it('adds character and returns it', done => {
      let character = {
        name: "Chewbacca"
      }
      chai.request(app)
          .post('/character')
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)

            chai.request(app)
                .get('/character')
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  expect(res.body.length).to.equal(1)
                  expect(res.body[0].name).to.equal("Chewbacca")
                  done()
                })
          })
    })
  })


})
