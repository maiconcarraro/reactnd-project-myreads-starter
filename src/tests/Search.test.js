import React from 'react';
import fetch from 'isomorphic-fetch';
import { shallow, mount } from 'enzyme';
import Search from '../components/Search';

import * as BooksAPI from '../api/BooksAPI';
import mockSearch from './__mocks__/books_api_search';
import mockBooks from './__mocks__/books_api_find_all';

describe('<Search />', () => {
  BooksAPI.search = query => {
    return new Promise((resolve, reject) => {
      resolve(mockSearch);
    });
  };

  const mountSearch = () => {
    return mount(
      <Search
        myBooks={mockBooks}
        onChangeBooks={jest.fn()}
        onHideSearchPage={jest.fn()}
      />
    );
  };

  it('mounts without crashing', () => {
    expect(mountSearch());
  });

  it("search 'b' on input and show books", async () => {
    const wrapper = mountSearch();

    expect(wrapper.find('Book').length).toBe(0);

    await wrapper
      .find('.react-autosuggest__input')
      .simulate('change', { target: { value: 'b' } });
    wrapper.update();

    expect(wrapper.find('Book').length).toBe(20);
  });
});
