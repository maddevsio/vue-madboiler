describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Home page opens', () => {
    cy.url().should('contain', '/');
  });
});
