import React from 'react';
import fetch from 'isomorphic-fetch';
import { MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
import App from '../App';

import * as BooksAPI from '../api/BooksAPI';
import mockBooks from './__mocks__/books_api_find_all';

describe('<App />', () => {
  BooksAPI.getAll = () => {
    return new Promise((resolve, reject) => {
      resolve(mockBooks);
    });
  };

  // Cria mount com rota default no '/'
  const mountApp = (initialEntries = ['/']) => {
    return mount(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  };

  // Cria shallow com rota default no '/'
  const shallowApp = (initialEntries = ['/']) => {
    return shallow(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  };

  it('shallow renders without crashing', () => {
    expect(shallowApp());
  });

  it('mounts without crashing', () => {
    expect(mountApp());
  });

  it("has ListBooks component on '/'", () => {
    expect(mountApp(['/']).find('ListBooks').length).toBe(1);
  });

  it("has ListBooks component on '/' go to '/search'", () => {
    const wrapper = mountApp(['/']);
    wrapper.find('.open-search a').simulate('click');
    expect(wrapper.find('Search').length).toBe(1);
  });

  it("has Search component on '/search'", () => {
    expect(mountApp(['/search']).find('Search').length).toBe(1);
  });

  it("has Search component on '/search' go to '/'", () => {
    const wrapper = mountApp(['/search']);
    wrapper.find('.close-search').simulate('click');
    expect(wrapper.find('ListBooks').length).toBe(1);
  });

  it('has Book components after reloadBooks() on BooksApp update', async () => {
    const wrapper = mountApp(['/']);

    await wrapper
      .find('BooksApp')
      .instance()
      .reloadBooks();

    wrapper.update();

    expect(wrapper.find('Book').length).toBe(7);
  });
});
