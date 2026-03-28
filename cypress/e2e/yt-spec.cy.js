describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://youtube.com/')

    cy.get('[name="search_query"]').type('Manual do Mundo')
    cy.get('.ytSearchboxComponentSearchButton').click()

  })
})
