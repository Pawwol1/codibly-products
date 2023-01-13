import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductsContext from '../../context/products-context';
import { Product } from '../TableOfProducts/TableOfProducts';
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

  useEffect(() => {
    const getProduct = async () => {
      const resp = await fetch(`https://reqres.in/api/product/${productID}`);
      if (!resp.ok) {
        const err = 'User not Found';
        throw new Error(err);
      }
      const data = await resp.json();
      setProduct(data.data);
    };
    getProduct();
  }, [productID]);

  console.log(ctx.totalProducts);

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
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default ProductModal;
