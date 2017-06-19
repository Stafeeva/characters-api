const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/server.js')
const expect = chai.expect

const app = server.app

chai.use(chaiHttp)

describe('app', () => {

  beforeEach(() => {
    server.resetCharacters()
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

    it('prevents the user from adding the same character twice', done => {
      let character = {
        name: "Chewbacca"
      }
      chai.request(app)
          .post('/character')
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(server.getCharacters().length).to.equal(1)

            chai.request(app)
                .post('/character')
                .send(character)
                .end((err, res) => {
                  expect(server.getCharacters().length).to.equal(1)
                  expect(res.status).to.equal(400)
                  done()
                })
          })
    })

    it('only adds valid characters', done => {
      let character = {}
      chai.request(app)
          .post('/character')
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(400)
            done()
          })
    })
  })

  describe('GET /character/:name', () => {
    it('displays a single character', done => {
      let character = {
        name: "Chewbacca"
      }
      chai.request(app)
          .post('/character')
          .send(character)
          .end((err, res) => {
            
            chai.request(app)
                .get('/character/Chewbacca')
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  done()
                })
          })
    })
  })

  describe('DELETE /chatacter/:id', () => {
    it('deletes character from a list', done => {
      let character = { name: 'R2D2' }
      chai.request(app)
        .post('/character')
        .send(character)
        .end((err, res) => {
          expect(server.getCharacters().length).to.equal(1)

          chai.request(app)
              .delete('/character/' + character.name)
              .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(server.getCharacters().length).to.equal(0)
                done()
              })
        })
    })
  })

})
