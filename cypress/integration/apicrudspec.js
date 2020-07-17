context('API Testing Services GET/POST/PUT/DELETE on cypress.io', () => {

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      Cypress.runner.stop()
    }
  });

  describe('Create person with request POST', () => {
    it('Create a person and validate response status equal 201 and content-type', () => {
      cy.fixture('people.json').then((people) => {
        const person = people[0]
        cy.createPeople(person)
          .then((response) => {
            expect(response).property('status').to.equal(201)
            expect(response).property('headers').property('content-type').contain('application/json')
          })
      })
    })

    it('Create person with request POST and validate response body and values and content-type', () => {
      cy.fixture('people.json').then((people) => {
        const person = people[1]
        cy.createPeople(person).then((response) => {
          expect(response).property('status').to.equal(201)
          expect(response).property('headers').property('content-type').contain('application/json')
          expect(response).property('body').to.contain({
            name: person.name,
            lastName: person.lastName,
            age: person.age,
            country: person.country
          })
          expect(response).property('body').to.contain({
            _id: response.body._id
          })

        })
      })
    })
  })
  describe('Modify a person with request PUT', () => {
    it('Modify name of a person with request PUT and validate its response status equal 200 and content-type', () => {
      var id;
      var nameMod = 'Paulina'
      cy.fixture('people.json').then((people) => {
        const persona1 = people[0]
        cy.createPeople(persona1).then((response) => {
          id = response.body._id
          cy.request(
            {
              method: 'PUT',
              url: '/people/' + id,
              body: {
                name: nameMod,
                lastName: response.body.lastName,
                age: response.body.age,
                country: response.body.country
              },
              headers: {
                'content-type': 'application/json'
              },
              failOnStatusCode: false
            }
          ).then((response) => {
            expect(response).property('status').to.equal(200)
            cy.request(
              {
                method: 'GET',
                url: '/people/' + id

              }).then((response) => {
                expect(response).property('body').to.contain({
                  name: nameMod
                })
                expect(response).property('headers').property('content-type').contain('application/json')

              })


          })
        })

      })

    })
  })

  describe('Show person by _id with request GET', () => {

    it('Search and a show person by _Id with request GET, validate response status equal 201 and response data and content-type', () => {
      var id;
      cy.fixture('people.json').then((people) => {

        const person1 = people[1]
        cy.createPeople(person1).then((response) => {
          expect(response).property('status').to.equal(201)
          expect(response).property('headers').property('content-type').contain('application/json')
          expect(response).property('body').to.contain({
            name: person1.name

          })
          id = response.body._id
          cy.request('/people/' + id).then((response) => {
            expect(response).property('body').to.contain({
              _id: id,
              name: person1.name,
              lastName: person1.lastName,
              age: person1.age,
              country: person1.country
            }
            )
            expect(response).property('status').to.equal(200)
            expect(response).property('headers').property('content-type').contain('application/json')
          })
        })
      })
    })
  })

  describe('List all people with request GET', () => {
    it('List people with request GET and validate response status equal 200', () => {
      cy.request('GET', '/people').then((response) => {
        expect(response).property('status').to.equal(200)
        expect(response).property('headers').property('content-type').contain('application/json')
      })
    })
  })

  describe('Delete all people with request DELETE', () => {
    it('Create 2 persons to after delete them', () => {

      cy.fixture('people.json').then((people) => {
        const person1 = people[0]
        cy.createPeople(person1).then((response) => {
          expect(response).property('status').to.equal(201)
        })
        const person2 = people[1]
        cy.createPeople(person2).then((response) => {
          expect(response).property('status').to.equal(201)
        })
      })
    })

    it('Delete all people with request DELETE and validate status response equal 200 and response body', () => {
      cy.allPeople().then((response) => {
        expect(response).property('status').to.equal(200)
        var peopleResponse = response.body
        var peopleLenght = peopleResponse.length
        var i = 0
        for (i; i < peopleLenght; i++) {
          cy.request('DELETE', 'people/' + peopleResponse[i]._id).then(
            (response) => {
              expect(response).property('status').equals(200)
            }
          )
        }
        cy.request('GET', '/people').its('body').should('have.length', 0)

      })
    })
  })
})
