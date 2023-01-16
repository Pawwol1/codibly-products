import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TableOfProducts from './TableOfProducts';
import ProductsContext from '../../context/products-context';

test('should render loading icon', () => {
  render(
    <MemoryRouter>
      <TableOfProducts />
    </MemoryRouter>
  );
  expect(screen.getByTestId('products_loading')).toBeInTheDocument();
});

test('empty list should response Products not found', () => {
  render(
    <ProductsContext.Provider
      value={{
        products: [],
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
        <TableOfProducts />
      </MemoryRouter>
    </ProductsContext.Provider>
  );
  expect(screen.getByTestId('products_notFound')).toBeInTheDocument();
});
