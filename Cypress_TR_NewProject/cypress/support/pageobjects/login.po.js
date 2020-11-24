class LoginPage {

    nonSocialLogin(userEmail, userPassword){
        cy.get('div span input[name="email"]').type(userEmail);
        cy.get('div span input[name="password"]').type(userPassword);
        cy.get('div button[type="submit"]').click();
    }

    logoutTNPage() {
        cy.get('button .MuiButton-label .MuiAvatar-root').click({force: true}); 
        cy.get('#custom-user-menu > .MuiPaper-root > .MuiList-root ').should('be.visible').contains('Log Out'). click({force: true});
        cy.url().should('not.contain', Cypress.env("/login"));
        }
    
}

export default LoginPage;
