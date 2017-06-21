describe('homepage', ()=> {

    it('has the right title', ()=> {
        browser.url('http://localhost:3000')
        browser.getTitle().should.be.equal('Star Wars Characters')
    })

})
