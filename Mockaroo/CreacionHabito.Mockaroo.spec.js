context('Creacion de Habito', () => {

    it('makes a wrong login attemp', () => {
        cy.visit('https://habitica.com/login')

        cy.get('#usernameInput').type('icedream93').should('have.value', 'icedream93');
        cy.get('#passwordInput').type('metropolis1');

        cy.get('.btn-info[type="submit"]').click()
        cy.wait(2000)        

        cy.request({
          method: 'GET',
          url: 'https://my.api.mockaroo.com/habits.json?key=e9780910',
          followRedirect: false,
          headers: {
              'accept': 'application/json'
          }
        })
        .then((response) => {
          var habits = Array.from(response.body);
          expect(response.status).to.eq(200);
          expect(response.headers['content-type']).to.eq('application/json');
          expect(response.body).to.not.be.null;

          habits.forEach(habit => {
              cy.get('[placeholder="Añadir una Hábito"]').type(habit.title).type('{enter}');        
            });
      });        
    })
});
