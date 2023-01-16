import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from '../context/products-context';
import FilterInput from './FilterInput/FilterInput';
import Header from './Header/Header';
import PageNotFound from './PageNotFound/PageNotFound';
import TableOfProducts from './TableOfProducts/TableOfProducts';

const Main = () => {
  const { pageNumber, filterID } = useParams();
  const ctx = useContext(ProductsContext);

  return (
    <>
      {(pageNumber === undefined && filterID === undefined) ||
      (pageNumber && Number(pageNumber) >= 1 && Number(pageNumber) <= 3) ||
      (filterID &&
        Number(filterID) >= 1 &&
        Number(filterID) <= ctx.totalProducts) ? (
        <div className="App">
          <Header />
          <FilterInput />
          <TableOfProducts />
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Main;
