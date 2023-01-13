import React, { useContext } from 'react';
import ProductsContext from '../../context/products-context';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import ProductRow from '../ProductRow/ProductRow';
import './TableOfProducts.scss';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value?: string;
}

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
            {ctx.products.map((product) => {
              return (
                <ProductRow
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  year={product.year}
                  color={product.color}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="tableOfProducts__notFound">Products not found</p>
      )}
      <PaginationComponent />
    </>
  );
};

export default TableOfProducts;
