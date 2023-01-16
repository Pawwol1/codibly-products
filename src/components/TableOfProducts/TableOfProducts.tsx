import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import ProductsContext from '../../context/products-context';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import ProductRow from '../ProductRow/ProductRow';
import './TableOfProducts.scss';

const TableOfProducts = () => {
  const ctx = useContext(ProductsContext);

  return (
    <>
      {ctx.products.length ? (
        <table className="tableOfProducts">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {!ctx.searchBoolean
              ? ctx.products.map((product) => {
                  return <ProductRow key={product.id} product={product} />;
                })
              : ctx.filteredProduct.map((product) => {
                  return <ProductRow key={product.id} product={product} />;
                })}
          </tbody>
        </table>
      ) : ctx.isLoading ? (
        <div className="tableOfProducts__loading">
          <CircularProgress data-testid="products_loading" />
        </div>
      ) : (
        <p
          className="tableOfProducts__notFound"
          data-testid="products_notFound"
        >
          Products not found
        </p>
      )}
      <PaginationComponent />
    </>
  );
};

export default TableOfProducts;
