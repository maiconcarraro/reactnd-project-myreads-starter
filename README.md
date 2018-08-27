- Instalar dependências `npm install`
- Rodar projeto `npm start`

## Tecnologias adicionadas

- [`group-array`](https://github.com/doowb/group-array/): para facilitar o agrupamento dos books por shelf
- [`react-autosuggest`](https://github.com/moroshko/react-autosuggest): input com sugestões de texto pra buscar
- [`prettier`](https://github.com/prettier/prettier): para formatar corretamente os arquivos

## Especificações do projeto

- Application Setup
  - [x] Is the application easy to install and start?
  - [x] Does the application include README with clear installation and launch instructions?
- Main Page
  - [x] Does the main page show three categories (or “bookshelves”) for books (currently reading, want to read, and read)?
  - [x] Does the main page allow users to move books between shelves?
  - [x] Does information persist between page refreshes?
- Search Page
  - [x] Does the search page have a search input that lets users search for books?
  - [x] Do the search results allow a user to categorize a book as “currently reading”, “want to read”, or “read”?
  - [x] Do selections made on the search page show up on the main page?
- Routing
  - [x] Does the main page link to the search page?
  - [x] Does the search page link back to the main page?
- Code Functionality
  - [x] Does the project code handle state management appropriately?
  - [x] Is JSX formatted properly?

## Extras

- [x] Movimentação em massa de livros (botão no bookshelf)
- [x] Sugestão de termos na busca pra melhorr a experiência do usuário evitando pesquisas sem resultado
- [x] Capa de livro padrão quando não encontrado
- [x] Adicionado publisher do book para diferenciar, pois alguns livros tem título e autor igual (pesquisar Drama)
- [x] Testes
  - [x] Corrigido código do localStorage no `BooksAPI` que conflita nos testes
  - [x] Adicionado mocks relacionado ao BooksAPI
  - [x] Adicionado testes da maioria dos componentes, incluindo as rotas do React-Router.
