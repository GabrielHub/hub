/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const convert = require('xml-js');
const fs = require('fs');

// ? Used to fix the relative path issues with readFileSync...
const path = require('path');

// * Parsing test for GS interview

const formatBook = (data) => {
  if (Array.isArray(data)) {
    return data.map(formatBook);
  }

  if (typeof data === 'object' && data !== null) {
    const flattened = {};

    Object.keys(data).forEach((key) => {
      const fieldName = key.startsWith('_') ? key.substring(1) : key;
      if (typeof data[key] === 'object' && data[key] !== null && '_text' in data[key]) {
        flattened[fieldName] = data[key]._text;
      } else {
        flattened[fieldName] = data[key];
      }
    });
    return flattened;
  }
  return data;
};

const bookParser = () => {
  // * Read books file
  const xmlFile = fs.readFileSync(path.resolve(__dirname, './books.xml'), 'utf8');

  // * Convert xml to json object
  const convertedData = JSON.parse(
    convert.xml2json(xmlFile, {
      compact: true
    })
  );

  // * Remove the declaration from object
  /*
    "_declaration": {
        "_attributes": {
        "version": "1.0"
        }
    },
  */
  // * Specifically return the array of book elements
  return convertedData.catalog.book;
};

/**
 * @description finds all books
 * @returns array of formatted book objects
 */
const findAllBookElements = () => {
  const data = bookParser();
  return formatBook(data);
};

/**
 * @description Finds all author elements
 * @returns Set of authors
 */
const findAllAuthorElements = () => {
  const data = bookParser();
  const authors = data.map(({ author }) => author._text);

  // * Remove duplicates by converting array to a Set
  return [...new Set(authors)];
};

/**
 * @description find a book by id
 * @param {string} id
 * @returns returns formatted book
 */
const findBook = (id) => {
  const data = bookParser();
  const bookObject = data.find((book) => book._attributes.id === id);
  return formatBook(bookObject);
};

const findBooksByCategory = (category, id) => {
  if (category === 'id') {
    throw Error('Use findBook() for ids instead of this function');
  }
  const data = bookParser();
  const matchingBooks = data.filter((book) => book[category]._text === id);
  return formatBook(matchingBooks);
};

// * Running logs and tests
console.log('findAllBookElements', findAllBookElements());
console.log('findAllAuthorElements', findAllAuthorElements());
console.log('findBook (by id)', findBook('bk103'));
console.log('findBooksByGenre', findBooksByCategory('genre', 'Fantasy'));
