import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

import * as BooksAPI from '../api/BooksAPI';

class Bookshelf extends React.Component {
  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
    books: PropTypes.array,
  };

  state = {};

  changeAllBooks = event => {
    const { onChangeBookshelf, books } = this.props;
    let count = books.length;

    books.map(book => {
      let newBookshelf = event.target.value;

      BooksAPI.update(book, newBookshelf).then(book => {
        count--;
        console.log(count);
        if (count === 0 && onChangeBookshelf) {
          onChangeBookshelf();
        }
      });

      return book;
    });
  };

  render() {
    const { onChangeBookshelf, id, title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
          <div className="book-shelf-changer-all">
            <select value={id} onChange={this.changeAllBooks}>
              <option value="move" disabled>
                Move all books to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map(book => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    cover={book.imageLinks && book.imageLinks.thumbnail}
                    bookshelf={book.shelf}
                    publisher={book.publisher}
                    onChangeBookshelf={onChangeBookshelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
