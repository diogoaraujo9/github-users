describe('Search Page', () => {
  const username = 'diogo-araujo9';

  beforeEach(() => {
    cy.visit('/');
  });

  it('search for an user', () => {
    cy.getByTestId('github-user-search').clear().type(username);
    cy.getByTestId('github-user-search-button').click();

    var regex = new RegExp(`\/user\/${username}$`);
    cy.location('pathname').should('match', regex);
  });

  it('invalid user should disable the button', () => {
    cy.fixture('usernames.json')
      .its('invalidUsernames')
      .then((list) => {
        list.forEach((item: string) => {
          cy.getByTestId('github-user-search').clear().type(item);
          cy.getByTestId('github-user-search-button').should('be.disabled');
        });
      });
  });
});
