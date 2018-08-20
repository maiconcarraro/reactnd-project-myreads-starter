import React from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends React.Component {
  static propTypes = {
    onShowSearchPage: PropTypes.func.isRequired,
    bookshelves: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        books: PropTypes.array,
      })
    ),
  };

  state = {};

  render() {
    const { onShowSearchPage, bookshelves } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves &&
              bookshelves.map(bookshelf => (
                <Bookshelf
                  key={bookshelf.title}
                  title={bookshelf.title}
                  books={bookshelf.books}
                />
              ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => onShowSearchPage()}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default ListBooks;
