import React from 'react';
import FilterInput from './FilterInput/FilterInput';
import ListOfProducts from './ListOfProducts/ListOfProducts';

const Main = () => {
  return (
    <div className="App">
      <FilterInput />
      <ListOfProducts />
    </div>
  );
};

export default Main;
