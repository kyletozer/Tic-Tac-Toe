Cypress.Commands.add('chooseSide', side => {
  return cy.get(`.side-${side}`).click()
})

Cypress.Commands.add('chooseSquare', id => {
  const selector = '.square'
  
  cy.wait(200)
  
  if(id === undefined) {
    return cy.get(`${selector}:not(.marked)`).eq(0).click()
  }
  return cy.get(selector).eq(id).click()
})