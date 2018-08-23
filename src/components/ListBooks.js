import React from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

import groupArray from 'group-array';

class ListBooks extends React.Component {
  static propTypes = {
    onShowSearchPage: PropTypes.func.isRequired,
    onChangeBooks: PropTypes.func,
    myBooks: PropTypes.array,
  };

  state = {
    bookshelves: [],
  };

  componentWillMount() {
    const { myBooks } = this.props;
    this.handleBooksAndSetState(myBooks);
  }

  componentWillReceiveProps(nextProps) {
    this.handleBooksAndSetState(nextProps.myBooks);
  }

  handleBooksAndSetState = myBooks => {
    /* Utilizado o groupArray https://www.npmjs.com/package/group-array
         Com ele é possível agrupar um array atavés de um atributo, neste caso o 'shelf'
         O retorno dele será algo como:
          { 
            currentlyReading: (2) [{…}, {…}],
            read: (3) [{…}, {…}, {…}],
            wantToRead: (2) [{…}, {…}]
          }
      */
    let bookshelves = groupArray(myBooks, 'shelf');

    // Só pra não sumir com a bookshelf se não possuir livros :)
    bookshelves = Object.assign(
      {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
      bookshelves
    );

    /* Aqui eu transformo num array melhor elaborado
        com id, title e books que é mais apropriado para passar pro <ListBooks />

        Faço um tratamento no title para acrescentar espaço entre textos e formato (css) com text-transform: capitalize 
        Então o texto que é 'wantToRead' se transforma em 'Want to Read'
        Benefícios disso é que se um dia quiser acrescentar um novo tipo de Bookshelf, já está pronto dinâmico!
     */
    bookshelves = Object.keys(bookshelves).map(bookshelf => {
      return {
        id: bookshelf,
        title: bookshelf.replace(/([A-Z])/g, ' $1').trim(),
        books: bookshelves[bookshelf],
      };
    }, {});

    this.setState({ bookshelves: bookshelves });
  };

  render() {
    const { onShowSearchPage, onChangeBooks } = this.props;
    const { bookshelves } = this.state;

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
                  key={bookshelf.id}
                  id={bookshelf.id}
                  title={bookshelf.title}
                  books={bookshelf.books}
                  onChangeBookshelf={onChangeBooks}
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
