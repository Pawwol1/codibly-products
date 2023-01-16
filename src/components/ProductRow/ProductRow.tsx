import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../context/products-context';
import './ProductRow.scss';

const ProductRow = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const handleOnClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <tr
      className="productRow"
      data-testid="productRow_testid"
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
