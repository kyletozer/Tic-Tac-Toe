describe('Playing through a game', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.chooseSide('x')
  })
  
  it('should place a marker on a tile that has been clicked', () => {
    
    cy
      .chooseSquare(5)
      
  })
})