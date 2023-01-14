import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import ProductsContext, { Product } from '../../context/products-context';
import './ProductModal.scss';

const ProductModal = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    year: 0,
    color: '',
    pantone_value: '',
  });
  const { productID } = useParams();
  const ctx = useContext(ProductsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const resp = await fetch(`https://reqres.in/api/product/${productID}`);
      if (!resp.ok) {
        const err = 'Product not Found';
        throw new Error(err);
      }
      const data = await resp.json();
      setProduct(data.data);
    };
    getProduct();
  }, [productID]);

  const handleClick = () => {
    navigate(-1);
    ctx.setSearchBoolean(false);
  };

  return (
    <div className="productModal" style={{ backgroundColor: product.color }}>
      {product.id >= 1 && product.id <= ctx.totalProducts ? (
        <div className="productModal__data">
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Year: {product.year}</p>
          <p>Color: {product.color}</p>
          <p>Pantone Value: {product.pantone_value}</p>
        </div>
      ) : (
        <p className="productModal__notFound">Product not found</p>
      )}
      <Button variant="contained" color="inherit" onClick={handleClick}>
        Go back
      </Button>
    </div>
  );
};

export default ProductModal;
