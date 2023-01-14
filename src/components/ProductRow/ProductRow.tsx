import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsContext, { Product } from '../../context/products-context';
import './ProductRow.scss';

const ProductRow = ({ product }: { product: Product }) => {
  const ctx = useContext(ProductsContext);
  const navigate = useNavigate();
  const handleOnClick = (id: number) => {
    ctx.setSearchBoolean(false);
    navigate(`/product/${id}`);
  };

  return (
    <tr
      className="productRow"
      style={{ backgroundColor: product.color }}
      onClick={() => handleOnClick(product.id)}
    >
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.year}</td>
    </tr>
  );
};

export default ProductRow;
