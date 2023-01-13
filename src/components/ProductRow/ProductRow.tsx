import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../TableOfProducts/TableOfProducts';
import './ProductRow.scss';

const ProductRow = ({ id, name, year, color }: Product) => {
  const navigate = useNavigate();
  const handleOnClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <tr
        className="productRow"
        style={{ backgroundColor: color }}
        onClick={() => handleOnClick(id)}
      >
        <td>{id}</td>
        <td>{name}</td>
        <td>{year}</td>
      </tr>
    </>
  );
};

export default ProductRow;
