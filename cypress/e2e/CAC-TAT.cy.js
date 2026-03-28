describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const LongText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 3)

    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Araújo')
    cy.get('#email').type('wellington.araujo@example.com')
    cy.get('#open-text-area').type(LongText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Araújo')
    cy.get('#email').type('wellington.araujo@example')
    cy.get('#open-text-area').type('Gostaria de saber mais sobre os serviços oferecidos.')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Araújo')
    cy.get('#email').type('wellington.araujo@example.com')
    cy.get('#open-text-area').type('Gostaria de saber mais sobre os serviços oferecidos.')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Wellington')
      .should('have.value', 'Wellington')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Araújo')
      .should('have.value', 'Araújo')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('wellington.araujo@example.com')
      .should('have.value', 'wellington.araujo@example.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhon.doe@example.com',
      message: 'Gostaria de saber mais sobre os serviços oferecidos.'
    })

    cy.get('.success').should('be.visible')
  })

  it('envia o formulário com sucesso usando comando contain', () => {
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Araújo')
    cy.get('#email').type('wellington.araujo@example.com')
    cy.get('#open-text-area').type('Gostaria de saber mais sobre os serviços oferecidos.')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    // cy.get('input[type="radio"]').each(($radio) => {
    //   cy.wrap($radio).check().should('be.checked')
    // })


    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
  //   cy.get('#email-checkbox')
  //     .check()
  //     .should('be.checked')

  //   cy.get('#phone-checkbox')
  //     .check()
  //     .should('be.checked')

  //   cy.get('#phone-checkbox')
  //     .uncheck()
  //     .should('not.be.checked')

    cy.get('input[type="checkbox"]') // seleciona todos os checkboxes, a referência é para todos os checkboxes
      .check()                       // marca todos os checkboxes
      .should('be.checked')
      .last()                        // seleciona o último checkbox, agora a referência é para o último checkbox
      .uncheck()
      .should('not.be.checked')      // verifica se o último checkbox não está marcado
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})
