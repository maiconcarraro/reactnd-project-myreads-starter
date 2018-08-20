import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    books: PropTypes.array,
  };

  state = {};

  render() {
    const { title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map(book => (
                <li key={book.id}>
                  <Book
                    title={book.title}
                    authors={book.authors}
                    cover={book.imageLinks.thumbnail}
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
