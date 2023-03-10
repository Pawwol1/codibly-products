import React from 'react';
import { render, screen } from '@testing-library/react';
import PaginationComponent from './PaginationComponent';
import { MemoryRouter } from 'react-router-dom';
import ProductsContext from '../../context/products-context';

test('pagination should be in document', () => {
  render(
    <ProductsContext.Provider
      value={{
        products: [],
        totalProducts: 12,
        page: 1,
        setPage: () => {},
        totalPages: 3,
        searchBoolean: false,
        setSearchBoolean: () => {},
        filteredProduct: [],
        setFilteredProduct: () => {},
        isLoading: false,
        setIsLoading: () => {},
      }}
    >
      <MemoryRouter>
        <PaginationComponent />
      </MemoryRouter>
    </ProductsContext.Provider>
  );
  const paginationElement = screen.getByTestId('pagination');
  expect(paginationElement).toBeInTheDocument();
});

test('pagination should not be in document when totalpages is 0', () => {
  render(
    <MemoryRouter>
      <PaginationComponent />
    </MemoryRouter>
  );
  expect(screen.getByTestId('hidden')).toBeInTheDocument();
});
