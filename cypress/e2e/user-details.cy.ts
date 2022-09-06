describe('User Details Page', () => {
  const username = 'diogo-araujo9';

  beforeEach(() => {
    cy.visit(`/user/${username}`);
  });

  it('show user details', () => {
    cy.getByTestId('user-name').invoke('text').should('have.length.gt', 0);
    cy.getByTestId('user-login').invoke('text').should('have.length.gt', 0);
    cy.getByTestId('user-bio').invoke('text').should('have.length.gt', 0);
    cy.getByTestId('user-location').invoke('text').should('have.length.gt', 0);
  });

  it('show repositories', () => {
    cy.getByTestId('repository-row').should('have.length', 2);
  });

  it('filter one repository by name', () => {
    cy.clearRepositoryFilters();
    cy.getByTestId('repository-name-filter').type('repository2');
    cy.getByTestId('repository-row').should('have.length', 1);
  });

  it('filter one repository by stars', () => {
    cy.clearRepositoryFilters();
    cy.getByTestId('repository-stars-filter').type('1');
    cy.getByTestId('repository-row').should('have.length', 1);
  });

  it('sort by name', () => {
    cy.clearRepositoryFilters();
    cy.wait(500);

    cy.getByTestId('sort-name').click();
    cy.wait(500);
    cy.getByTestId('repository-row-name').first().contains('repository2');

    cy.getByTestId('sort-name').click();
    cy.wait(500);
    cy.getByTestId('repository-row-name').first().contains('repository1');
  });

  it('sort by stars', () => {
    cy.clearRepositoryFilters();
    cy.wait(500);

    cy.getByTestId('sort-stars').click();
    cy.wait(500);
    cy.getByTestId('repository-row-name').first().contains('repository1');

    cy.getByTestId('sort-stars').click();
    cy.wait(500);
    cy.getByTestId('repository-row-name').first().contains('repository2');
  });

  it('toggle between repository list and details mode', () => {
    cy.clearRepositoryFilters();
    cy.wait(500);

    cy.getByTestId('repository-row').first().click();

    cy.getByTestId('repository-go-back-to-list-button').click();
    cy.getByTestId('repository-go-back-to-list-button').should('not.exist');

    cy.getByTestId('repository-row').first().should('exist');
  });
});
