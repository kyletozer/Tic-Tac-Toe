Cypress.Commands.add('startGame', (options = { player: 'friend', side: 'x' }) => {
  
  const { player, side } = options

  cy
    .get('#set-players')
    .as('form')
  
  cy
    .get('@form')
    .get(`input[value="${player}"]`)
    .click()

  cy
    .get('@form')
    .get(`input[value="${side}"]`)

  cy
    .get('@form')
    .get('button[type="submit"]')
    .click()
})

Cypress.Commands.add('performSequence', sequence => {
  sequence.forEach(space => {
    cy.wait(100)
    cy.get('.square').eq(space).click()
  })
})