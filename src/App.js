import React from 'react';
import { Route } from 'react-router-dom';
import Search from './components/Search';
import ListBooks from './components/ListBooks';
import './App.css';

import * as BooksAPI from './api/BooksAPI';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
  };

  componentDidMount() {
    this.reloadBooks();
  }

  reloadBooks = () => {
    return BooksAPI.getAll().then(books =>
      this.setState({
        myBooks: books,
      })
    );
  };

  render() {
    const { myBooks } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBooks
              myBooks={myBooks}
              onChangeBooks={this.reloadBooks}
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
              myBooks={myBooks}
              onChangeBooks={this.reloadBooks}
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
