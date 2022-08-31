export {};
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Método que busca um elemento DOM com base no atributo data-testid
       * @example cy.getByTestId('element')
       */
      getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Método para limpar os filtros dos repositórios
       * @example cy.getByTestId('element')
       */
      clearRepositoryFilters(): void;
    }
  }
}
