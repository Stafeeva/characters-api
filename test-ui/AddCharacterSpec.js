describe("Add character page", () => {

  it("has the right heading", () => {
    browser.url('http://localhost:3000/character/add')
    browser.getText('h2').should.be.equal('Add character')
  })

  it("has 'Back' link", () => {
    browser.url('http://localhost:3000/character/add')
    browser.click('a')
    browser.waitUntil(() => {
      return browser.getText('h2') === "Welcome!"
    }, 3000)
    browser.getUrl().should.be.equal('http://localhost:3000/')
  })

  it("allows user to add character to the list of characters", () => {
    browser.url('http://localhost:3000/character/add')
    const input = browser.element('input#name')

    input.setValue('R2D2')
    browser.click('#addCharacterButton')

    browser.waitUntil(() => {
      return browser.getText('h2') === "Welcome!"
    }, 2000)

    browser.getText('#R2D2').should.be.equal("R2D2")
  })

})
