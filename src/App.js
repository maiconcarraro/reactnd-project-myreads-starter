import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import './components/Search';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

import groupArray from 'group-array';

class BooksApp extends React.Component {
  state = {
    bookshelves: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      /* Utilizado o groupArray https://www.npmjs.com/package/group-array
         Com ele é possível agrupar um array atavés de um atributo, neste caso o 'shelf'
         O retorno dele será algo como:
          { 
            currentlyReading: (2) [{…}, {…}],
            read: (3) [{…}, {…}, {…}],
            wantToRead: (2) [{…}, {…}]
          }
      */
      let bookshelves = groupArray(books, 'shelf');

      /* Aqui eu transformo num array melhor elaborado
         com title e books que é mais apropriado para passar pro <ListBooks />

         Faço um tratamento no title para acrescentar espaço entre textos e formato (css) com text-transform: capitalize 
         Então o texto que é 'wantToRead' se transforma em 'Want to Read'
         Benefícios disso é que se um dia quiser acrescentar um novo tipo de Bookshelf, já está pronto dinâmico!
      */
      bookshelves = Object.keys(bookshelves).map(bookshelf => {
        return {
          title: bookshelf.replace(/([A-Z])/g, ' $1').trim(),
          books: bookshelves[bookshelf],
        };
      }, {});

      this.setState({ bookshelves: bookshelves });
    });
  }

  render() {
    const { bookshelves } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBooks
              bookshelves={bookshelves}
              onShowSearchPage={() => {
                history.push('/search');
              }}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <Search
              onHideSearchPage={() => {
                history.push('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
