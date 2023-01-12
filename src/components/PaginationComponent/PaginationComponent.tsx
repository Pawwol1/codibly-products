import React from 'react';
import Pagination from '@mui/material/Pagination';
import './PaginationComponent.scss';
interface IProps {
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({ totalPages, setPage }: IProps) => {
  return (
    <div className="paginationComponent">
      {totalPages > 1 ? (
        <Pagination count={totalPages} onChange={(e, page) => setPage(page)} />
      ) : null}
    </div>
  );
};

export default PaginationComponent;
