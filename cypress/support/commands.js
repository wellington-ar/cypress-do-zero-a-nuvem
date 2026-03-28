// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', project => {
//     cy.get('#firstName').type('Wellington')
//     cy.get('#lastName').type('Araújo')
//     cy.get('#email').type('wellington.araujo@example.com')
//     cy.get('#open-text-area').type('Gostaria de saber mais sobre os serviços oferecidos.')
//     cy.contains('button', 'Enviar').click()
// })

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {

//     cy.get('#firstName').type(user.firstName)
//     cy.get('#lastName').type(user.lastName)
//     cy.get('#email').type(user.email)
//     cy.get('#open-text-area').type(user.message)
//     cy.contains('button', 'Enviar').click()
// })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Wellington',
    lastName: 'Araújo',
    email: 'wellington.araujo@example.com',
    message: 'Gostaria de saber mais sobre os serviços oferecidos.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.message)
    cy.contains('button', 'Enviar').click()
})
