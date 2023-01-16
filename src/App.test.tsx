import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from './App';
import ProductsContext from './context/products-context';
import userEvent from '@testing-library/user-event';

it('snapshot for App component', () => {
  const renderedComponent = renderer
    .create(
      <ProductsContext.Provider
        value={{
          products: [{ id: 1, name: 'cerulean', year: 2000, color: '' }],
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
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ProductsContext.Provider>
    )
    .toJSON();
  expect(renderedComponent).toMatchSnapshot();
});

test('modal should open after a row click', async () => {
  render(
    <ProductsContext.Provider
      value={{
        products: [{ id: 1, name: 'cerulean', year: 2000, color: '' }],
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
      <App />
    </ProductsContext.Provider>,
    { wrapper: BrowserRouter }
  );
  const user = userEvent.setup();

  const openModalElement = screen.getByTestId('productRow_testid');
  await user.click(openModalElement);

  const btnElement = screen.getByText(/go back/i);
  expect(btnElement).toBeInTheDocument();
});

test('should show "Page not Found" on badRoute', () => {
  const badRoute = '/bad/route';
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Page not Found/i)).toBeInTheDocument();
});
