import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
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
  const ctx = useContext(ProductsContext);
  const { productID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await fetch(`https://reqres.in/api/product/${productID}`);
        if (!resp.ok) {
          const err = 'Product not Found';
          throw new Error(err);
        }
        const data = await resp.json();
        setProduct(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
    ctx.setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  const handleClick = () => {
    navigate('/page/1');
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
      ) : ctx.isLoading ? (
        <CircularProgress />
      ) : (
        <p className="productModal__notFound">Product not found</p>
      )}
      <Button variant="contained" color="inherit" onClick={handleClick}>
        Go back to main page
      </Button>
    </div>
  );
};

export default ProductModal;
