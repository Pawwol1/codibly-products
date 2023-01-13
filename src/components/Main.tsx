import React from 'react';
import FilterInput from './FilterInput/FilterInput';
import TableOfProducts from './TableOfProducts/TableOfProducts';

const Main = () => {
  return (
    <div className="App">
      <FilterInput />
      <TableOfProducts />
    </div>
  );
};

export default Main;
