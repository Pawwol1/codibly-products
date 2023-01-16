import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import ProductModal from './components/ProductModal/ProductModal';
import PageNotFound from './components/PageNotFound/PageNotFound';
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/page/:pageNumber" element={<Main />} />
      <Route path="/filter/:filterID" element={<Main />} />
      <Route path="/product/:productID" element={<ProductModal />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
