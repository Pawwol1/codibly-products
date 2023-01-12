import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import ProductModal from './components/ProductModal/ProductModal';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:productID" element={<ProductModal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
