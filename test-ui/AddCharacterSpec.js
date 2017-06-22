describe("Add character page", () => {

  it("has the right heading", () => {
    browser.url('http://localhost:3000/character/add')
    browser.getText('h2').should.be.equal('Add character')
  })

  it("allowes user to fill in 'name' with 'R2D2'", () => {
    browser.url('http://localhost:3000/character/add')
    const input = browser.element('input')
    input.setValue('R2D2')
    input.getValue().should.be.equal('R2D2')
  })

})
