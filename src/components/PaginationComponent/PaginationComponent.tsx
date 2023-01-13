import React, { useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import ProductsContext from '../../context/products-context';
import './PaginationComponent.scss';

const PaginationComponent = () => {
  const ctx = useContext(ProductsContext);

  return (
    <div className="paginationComponent">
      {ctx.totalPages > 1 ? (
        <Pagination
          count={ctx.totalPages}
          onChange={(e, page) => ctx.setPage(page)}
        />
      ) : null}
    </div>
  );
};

export default PaginationComponent;
