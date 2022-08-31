export {};

Cypress.Commands.add('getByTestId', (id: string) => {
  return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add('clearRepositoryFilters', () => {
  cy.getByTestId('repository-stars-filter').clear();
  cy.getByTestId('repository-name-filter').clear();
});
