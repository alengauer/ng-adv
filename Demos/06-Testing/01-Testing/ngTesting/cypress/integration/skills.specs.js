/// <reference types="Cypress" />

context('Skills', () => {
  beforeEach(() => {
    cy.intercept("GET",'http://localhost:3000/skills',{fixture: "skills.json"});
    cy.visit('https://localhost:4200/skills/');
  });

  describe('Skill Items', () => {
    it('Shows 2 rows by default', () => {
      cy.get('.skillrow').should('have.length', 2);
    });

    it('Shows 3 rows when ShowAll is clicked', () => {
      cy.get('#mat-slide-toggle-1-input').check({ force: true });
      cy.get('.skillrow').should('have.length', 3);
    });

    it('Shows the correct complete count  when complete is toogled', () => {
      cy.get('#mat-slide-toggle-2-input').check({ force: true });
      cy.get('#notcompletecount').contains('1');
    });
  });
});
