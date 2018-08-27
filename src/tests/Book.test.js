import React from 'react';
import fetch from 'isomorphic-fetch';
import { shallow, mount } from 'enzyme';
import Book from '../components/Book';

import * as BooksAPI from '../api/BooksAPI';
import mockBook from './__mocks__/books_api_get';

describe('<Book />', () => {
  BooksAPI.update = () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  };

  const mountBook = () => {
    return mount(
      <Book
        id={mockBook.id}
        title={mockBook.title}
        authors={mockBook.authors}
        cover={mockBook.imageLinks && mockBook.imageLinks.thumbnail}
        bookshelf={mockBook.shelf}
        publisher={mockBook.publisher}
        onChangeBookshelf={jest.fn()}
      />
    );
  };

  it('mounts without crashing', () => {
    expect(mountBook());
  });

  it("change bookshelf to 'read'", async () => {
    const wrapper = mountBook();

    expect(wrapper.state('newBookshelf')).toBe(undefined);

    await wrapper
      .find('.book-shelf-changer select')
      .simulate('change', { target: { value: 'read' } });
    wrapper.update();

    expect(wrapper.state('newBookshelf')).toBe('read');
  });
});
