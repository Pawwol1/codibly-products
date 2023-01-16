import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FilterInput from './FilterInput';
import TableOfProducts from '../TableOfProducts/TableOfProducts';
import ProductsContext from '../../context/products-context';

test('value from input should be rendered', () => {
  render(
    <MemoryRouter>
      <FilterInput />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText('Type ID to search');
  const searchValue: number = 1;
  fireEvent.change(inputElement, { target: { value: searchValue } });
  expect(inputElement).toHaveValue(searchValue);
});

test('searched value should be found and put it in the list', () => {
  render(
    <ProductsContext.Provider
      value={{
        products: [{ id: 2, name: 'fuchsia rose', year: 2001, color: '' }],
        totalProducts: 12,
        page: 0,
        setPage: () => {},
        totalPages: 0,
        searchBoolean: false,
        setSearchBoolean: () => {},
        filteredProduct: [],
        setFilteredProduct: () => {},
        isLoading: false,
        setIsLoading: () => {},
      }}
    >
      <MemoryRouter>
        <FilterInput />
        <TableOfProducts />
      </MemoryRouter>
    </ProductsContext.Provider>
  );
  const inputElement = screen.getByPlaceholderText('Type ID to search');
  const searchValue: number = 2;
  fireEvent.change(inputElement, { target: { value: searchValue } });
  expect(inputElement).toHaveValue(searchValue);

  const btnElement = screen.getByText('Search');
  fireEvent.click(btnElement);

  const pElement = screen.getByTestId('productRow_testid');
  expect(pElement).toHaveTextContent('2');
});

test('should print Wrong input when value from the input is wrong', () => {
  render(
    <MemoryRouter>
      <FilterInput />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText('Type ID to search');
  const searchValue: number = 13;
  fireEvent.change(inputElement, { target: { value: searchValue } });
  expect(inputElement).toHaveValue(searchValue);

  const divElement = screen.getByTestId('wrongInput');
  expect(divElement).toBeInTheDocument();
});
