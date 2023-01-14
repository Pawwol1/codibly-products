import React, { useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import ProductsContext from '../../context/products-context';
import { useNavigate, useParams } from 'react-router-dom';
import './PaginationComponent.scss';

const PaginationComponent = () => {
  const ctx = useContext(ProductsContext);
  const navigate = useNavigate();
  const { pageNumber } = useParams();

  useEffect(() => {
    pageNumber && ctx.setPage(Number(pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div className="paginationComponent">
      {ctx.totalPages > 1 ? (
        <Pagination
          count={ctx.totalPages}
          onChange={(e, page) => {
            ctx.setPage(page);
            navigate(`/page/${page}`);
          }}
          page={ctx.page}
        />
      ) : (
        <p data-testid="hidden" aria-hidden="true" />
      )}
    </div>
  );
};

export default PaginationComponent;
