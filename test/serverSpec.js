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
          .get('/api/character')
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
          .post('/api/character')
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)

            chai.request(app)
                .get('/api/character')
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
          .post('/api/character')
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(server.getCharacters().length).to.equal(1)

            chai.request(app)
                .post('/api/character')
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
          .post('/api/character')
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
          .post('/api/character')
          .send(character)
          .end((err, res) => {

            chai.request(app)
                .get('/api/character/' + character.name)
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  done()
                })
          })
    })
  })

  describe('PUT /character/:name', () => {
    it("updates a character given the name", (done) => {
      let character = {
        name: "Chewbacca",
        height: 45
      }
      chai.request(app)
          .post('/api/character')
          .send(character)
          .end((err, res) => {

          chai.request(app)
              .put('/api/character/' + character.name)
              .send({name: "Chewbacca", height: 46})
              .end((err, res) => {
                expect(res.status).to.equal(200)
                done()
              })
      })
    })
  })

  describe('DELETE /chatacter/:name', () => {
    it('deletes character from a list', done => {
      let character = { name: 'R2D2' }
      chai.request(app)
        .post('/api/character')
        .send(character)
        .end((err, res) => {
          expect(server.getCharacters().length).to.equal(1)

          chai.request(app)
              .delete('/api/character/' + character.name)
              .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(server.getCharacters().length).to.equal(0)
                done()
              })
        })
    })
  })

  describe('/POST /favourite/:name', () => {
    it("adds a character to the list of favourites", (done) => {
      let character = {
        name: "R2D2"
      }
      chai.request(app)
          .post('/api/favourite/' + character.name)
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)

            chai.request(app)
                .get('/api/favourite')
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  expect(res.body[character.name]).to.equal(true)
                  done()
                })
        })
    })
  })

  describe('DELETE /favourite/:name', () => {
    it("changes the status of favourite character to 'false'", (done) => {
      let character = {
        name: "Darth Vader"
      }
      chai.request(app)
          .post('/api/favourite/' + character.name)
          .send(character)
          .end((err, res) => {
            expect(res.status).to.equal(201)

            chai.request(app)
                .get('/api/favourite')
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  expect(res.body[character.name]).to.equal(true)

                  chai.request(app)
                      .delete('/api/favourite/' + character.name)
                      .end((err, res) => {
                        expect(res.status).to.equal(200)

                        chai.request(app)
                            .get('/api/favourite')
                            .end((err, res) => {
                              expect(res.status).to.equal(200)
                              expect(res.body[character.name]).to.equal(false)
                              done()
                        })
                  })
            })
      })
    })
  })

})
