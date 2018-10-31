describe('Playing through a game', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('should play through a sequence with a friend and start a new game immediately after', () => {
    cy.startGame()
    cy.performSequence([0, 3, 1, 4, 2])
    cy.startGame()
  })

  it.only('should play through a sequence against the computer', () => {
    cy.startGame({ player: 'computer' })
    cy.chooseSquare()
  })
})