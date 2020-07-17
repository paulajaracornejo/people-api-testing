// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createPeople", (datos) => {

    cy.request({
        method: 'POST',
        url: '/people',
        body:
        {
            name: datos.name,
            lastName: datos.lastName,
            age: datos.age,
            country: datos.country
        },
        headers: {
            'content-type': 'application/json'
        }, failOnStatusCode: false
    }
    )

})

Cypress.Commands.add("deletePeople", (data) => {
    cy.request(
        'POST',
        '/people',
        {
            data
        }
    )
})

Cypress.Commands.add('allPeople', () => {
    cy.request({
        method: 'GET',
        url: '/people', failOnStatusCode: false
    })
})