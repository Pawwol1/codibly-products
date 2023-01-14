import React from 'react';
import FilterInput from './FilterInput/FilterInput';
import Header from './Header/Header';
import TableOfProducts from './TableOfProducts/TableOfProducts';

const Main = () => {
  return (
    <div className="App">
      <Header />
      <FilterInput />
      <TableOfProducts />
    </div>
  );
};

export default Main;
