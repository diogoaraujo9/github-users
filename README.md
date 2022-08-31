# GitHub Users

Aplicação web feita em Angular 14, onde é possível buscar usuários do GitHub, ver suas informações básicas e navegar em uma listagem de seus repositórios.

## Funcionalidades

Essa aplicação tem como funcionalidades:

- Buscar dados de usuários do GitHub;
- Mostrar os repositórios dos usuários pesquisados;
- Filtrar e ordernar os repositórios através do nome e da quantidade de estrelas.

## Instalação / Começando

### Pré-requisitos

Antes de rodar o projeto, garanta que o NodeJs, o NPM e o Angular CLI estão instalados na máquina. Caso possua dúvidas dessa etapa, por favor consultar o [tutorial de Setup do Angular](https://angular.io/guide/setup-local).

### Execução do projeto

Para executar a aplicação, abra um terminal e execute os seguintes comandos:

```shell
// Clonar o repositório
git clone https://github.com/diogoaraujo9/github-users.git

// Acessar a pasta raíz do projeto
cd github-users/

// Instalar as dependências
npm install

// Rodar o projeto
npm start
```

Após rodar os comandos acima, a aplicação ficará disponível na porta `4200`.

### Build

Para compilar o projeto, execute o comado abaixo:

```shell
npm run build
```

Os artefatos gerados poderão ser encontrados nesse caminho: `./dist`.

### Testes unitários

O projeto conta com testes unitários criados com o `Karma` e `Jasmine`. Para rodar os testes, execute o comando abaixo na raíz do projeto:

```shell
npm run test
```

Os testes que serão executados possuem a extensão `*.spec.ts` e se encontram junto dos arquivos dos componentes a serem testados.

Para gerar o code coverage, rode o comando abaixo na raíz do projeto:

```shell
npm run test:coverage
```

O relatório de resultados se encontrará no caminho: `./coverage`

### Testes integrados

O projeto conta com testes unitários criados com o `Cypress`. Para rodar os testes integrados, execute o comando abaixo na raíz do projeto:

```
npm run cypress:run
```

Os testes que serão executados possuem a extensão `*.cy.ts` e se encontram no caminho: `./cypress/e2e/`.

## Rate Limit

O GitHub limita a quantidade chamadas de API feitas por hora. Chamadas não autenticadas terão um Rate Limit menor que chamadas autenticadas. Por default, o projeto está configurado para realizar chamadas não autenticadas. Porém, caso queira realizar chamadas autenticadas, adicione o seu Personal Access Token no campo `token` no arquivo que se encontra nesse caminho: `src/environments/environment.ts`

Para gerar um Personal Access Token, siga o [tutorial da GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Configuração do ESLint e Prettier (opcional)

O projeto possui o `ESlint` e o `Prettier` configurados, o que facilita a padronização de códigos. Para aproveitar dessas configurações no `VSCode`, instale as seguintes extensões:

- ESLint
- Prettier - Code formatter
- Prettier ESLint

Após finalizar as instações, é possível habilitar a formação automática sempre que salvar um arquivo: [tutorial para configurar o Auto Save Format](https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code)
