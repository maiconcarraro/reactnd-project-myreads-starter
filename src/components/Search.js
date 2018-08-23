import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import Autosuggest from 'react-autosuggest';
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
} from './SuggestionsBooks';

import * as BooksAPI from '../api/BooksAPI';

class Search extends React.Component {
  static propTypes = {
    onHideSearchPage: PropTypes.func.isRequired,
    onChangeBooks: PropTypes.func,
    myBooks: PropTypes.array,
  };

  state = {
    value: '',
    suggestions: [],
    searching: false,
  };

  onSearchBooks = (event, { newValue, method }) => {
    const { value } = this.state;
    const { myBooks } = this.props;

    if (!newValue) {
      this.setState({
        value: newValue,
        books: [],
        searching: false,
      });
    } else if (value !== newValue) {
      this.setState({
        value: newValue,
        searching: true,
      });

      BooksAPI.search(newValue).then(books => {
        if (books.error) {
          books = [];
        }

        // Atualiza o bookshelf
        books.map(book => {
          let bookFound = myBooks.find(myBook => myBook.id === book.id);
          if (bookFound) {
            book.shelf = bookFound.shelf;
          }
          return book;
        });

        this.setState({
          value: newValue,
          books: books,
          searching: false,
        });
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, books, suggestions, searching } = this.state;
    const { onHideSearchPage, onChangeBooks } = this.props;
    const inputProps = {
      placeholder: 'Search by title or author',
      value,
      onChange: this.onSearchBooks,
    };

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onHideSearchPage()}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            {
              // Autosuggest não impede a pessoa de digitar um nome fora da lista, ou até mesmo do autor
              // é apenas para melhor a experiência da pessoa sabendo qual são valores válidos
            }
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searching ? (
              <div className="loading">Buscando...</div>
            ) : (
              books &&
              books.map(book => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    cover={book.imageLinks && book.imageLinks.thumbnail}
                    bookshelf={book.shelf}
                    publisher={book.publisher}
                    onChangeBookshelf={onChangeBooks}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
