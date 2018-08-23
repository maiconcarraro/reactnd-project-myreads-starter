import React from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from '../api/BooksAPI';
import imgNotFound from '../img/book_not_found.jpg';

class Book extends React.Component {
  // Eu poderia passar um objeto book, mas acredito que a vantagem de transformar em
  // componentes é que você possa utilizar de qualquer lugar com um jeito fácil e
  // simples de passar valores, sem precisar ser um objeto complexo
  static propTypes = {
    onChangeBookshelf: PropTypes.func,
    id: PropTypes.string.isRequired,
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    bookshelf: PropTypes.string,
    publisher: PropTypes.string,
  };

  state = {
    newBookshelf: undefined,
  };

  changeBookshelf = event => {
    const { onChangeBookshelf, id } = this.props;
    let book = {
      id: id,
    };
    let newBookshelf = event.target.value;

    // Acredito que o ideal seria tratar o retorno do update para atualizar os bookshelves,
    // porém como é um projeto simples e acabaria tendo que fazer alguns loops aqui pra corrigir
    // de remover de uma bookshelf e adicionar em outra, acabei fazendo reload de tudo pra simplificar o código
    BooksAPI.update(book, newBookshelf).then(book => {
      this.setState({
        newBookshelf: newBookshelf,
      });
      if (onChangeBookshelf) {
        onChangeBookshelf();
      }
    });
  };

  render() {
    const { cover, title, authors, publisher, bookshelf } = this.props;
    const { newBookshelf } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <img
            src={cover || imgNotFound}
            width="128"
            height="193"
            className="book-cover"
            title={title}
            alt={title}
          />
          <div className="book-shelf-changer">
            <select
              onChange={this.changeBookshelf}
              value={newBookshelf || bookshelf || 'none'}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors && 'by ' + authors.join(', ')}
        </div>
        <div className="book-publisher">{publisher}</div>
      </div>
    );
  }
}

export default Book;
