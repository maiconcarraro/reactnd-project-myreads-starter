import React from 'react';
import titles from '../utils/books_titles';

// Baseado aqui https://codepen.io/moroshko/pen/LGNJMy
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return titles.filter(title => regex.test(title));
};

export const getSuggestionValue = suggestion => suggestion;

export const renderSuggestion = suggestion => {
  return <span>{suggestion}</span>;
};
