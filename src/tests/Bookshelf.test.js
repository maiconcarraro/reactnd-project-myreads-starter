import React from 'react';
import fetch from 'isomorphic-fetch';
import { shallow, mount } from 'enzyme';
import Bookshelf from '../components/Bookshelf';

import * as BooksAPI from '../api/BooksAPI';
import mockBookshelf from './__mocks__/bookshelves_get';

describe('<Bookshelf />', () => {
  BooksAPI.update = () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  };

  const mountBookshelf = () => {
    return mount(
      <Bookshelf
        id={mockBookshelf.id}
        title={mockBookshelf.title}
        books={mockBookshelf.books}
        onChangeBookshelf={jest.fn()}
      />
    );
  };

  it('mounts without crashing', () => {
    expect(mountBookshelf());
  });

  it('move all books to other bookshelf', async () => {
    const wrapper = mountBookshelf();

    expect(wrapper.state('qty')).toBe(2);

    await wrapper
      .find('.book-shelf-changer-all select')
      .simulate('change', { target: { value: 'read' } });
    wrapper.update();

    expect(wrapper.state('qty')).toBe(0);
  });
});
