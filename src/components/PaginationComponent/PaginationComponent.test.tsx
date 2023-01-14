import React from 'react';
import { render, screen } from '@testing-library/react';
import PaginationComponent from './PaginationComponent';

test('pagination should be in document', async () => {
  render(<PaginationComponent />);
  const paginationElement = await screen.findByTestId('pagination');
  expect(paginationElement).toBeInTheDocument();
});

test('pagination should not be in document when totalpages is 0', async () => {
  render(<PaginationComponent />);
  expect(screen.getByTestId('hidden')).toBeInTheDocument();
});
