import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="pageNotFound">
      <h2>Page not Found</h2>
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        color="inherit"
        size="medium"
      >
        Return to the main page
      </Button>
    </div>
  );
};

export default PageNotFound;
