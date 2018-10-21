Cypress.Commands.add('chooseSide', side => {
  return cy.get(`.side-${side}`).click()
})

Cypress.Commands.add('chooseSquare', (index = 0) => {
  return cy.get('.square').eq(index).click()
})