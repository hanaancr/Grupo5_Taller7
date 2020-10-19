context('Login Tests', () => {
    it('Login Test with  dynamic data', () => {
        cy.visit('https://habitica.com/login')

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/users.json?key=e9780910',
            followRedirect: false,
            headers: {
                'accept': 'application/json'
            }
        })
        .then((response) => {
            var users = Array.from(response.body);
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.eq('application/json');
            expect(response.body).to.not.be.null;
 
            users.forEach(user => {
                cy.get('#usernameInput').type(user.email).should('have.value', user.email);
                cy.get('#passwordInput').type(user.password);
        
                cy.get('.btn-info[type="submit"]').click()
                cy.get('#usernameInput').clear();
                cy.get('#passwordInput').clear();

            });
        });
    });
})