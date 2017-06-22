describe("Add character page", () => {

  it("has the right heading", () => {
    browser.url('http://localhost:3000/character/add')
    browser.getText('h2').should.be.equal('Add character')
  })

  // it("allowes user to fill in 'name' with 'R2D2'", () => {
  //   browser.url('http://localhost:3000/character/add')
  //   const input = browser.element('input')
  //   input.setValue('R2D2')
  //   input.getValue().should.be.equal('R2D2')
  // })

  it("has 'Back' link", () => {
    browser.url('http://localhost:3000/character/add')
    browser.click('a')
    browser.waitUntil(() => {
      return browser.getText('h2') === "Welcome!"
    }, 3000)
    browser.getUrl().should.be.equal('http://localhost:3000/')
  })

  it("allowes user to add charachter to the list of characters", () => {
    browser.url('http://localhost:3000/character/add')
    const input = browser.element('input')
    input.setValue('R2D2')
    browser.click('#addCharacterButton')
    browser.waitUntil(() => {
      return browser.getText('h2') === "Welcome!"
    }, 3000)
    browser.element('#R2D2').should.exist
  })

})
