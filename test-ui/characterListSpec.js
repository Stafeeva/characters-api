describe('homepage', ()=> {

  it('has the right title', () => {
    browser.url('http://localhost:3000')
    browser.getTitle().should.be.equal('Star Wars Characters')
  })

  it("has 'Add Character' button", () => {
    browser.url('http://localhost:3000')
    browser.getText('.button').should.be.equal('Add character')
    browser.click('.button')
    browser.waitUntil(() => {
      return browser.getText('h2') === "Add character"
    }, 10000)
    browser.getUrl().should.be.equal('http://localhost:3000/character/add')
  })

})
