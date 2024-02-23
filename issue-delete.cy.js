describe('Delete issue task', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            // Open the first issue from the board
            cy.contains('This is an issue of type: Task.').click();
        });
    });
  
    it('Should open the issue and delete it', () => {
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]', { timeout: 30000 }).should('be.visible');
  
        // Click on the 'Delete issue' button in the confirmation modal
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]', { timeout: 30000 }).should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
    });
  });
  
  describe('Cancel in delete confirmation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            // Open the first issue from the board
            cy.contains('This is an issue of type: Task.').click();
        });
    });
    it('Should open the issue detail view modal and cancel deletion successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]', { timeout: 30000 }).should('be.visible');
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]', { timeout: 30000 }).should('not.exist');
        cy.contains('This is an issue of type: Task.').should('be.visible');
    });
  });
  