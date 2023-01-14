import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import ProductsContext from '../../context/products-context';
import './FilterInput.scss';

const FilterInput = () => {
  const [searchID, setSearchID] = useState<string | number>('');
  const [inputError, setInputError] = useState(false);
  const ctx = useContext(ProductsContext);

  useEffect(() => {
    if (searchID !== '') {
      setInputError(searchID < 1 || searchID > 12);
    }
  }, [searchID]);

  const handleIDChange = (e: { target: { value: string } }) => {
    const limit = 2;
    setSearchID(e.target.value.slice(0, limit));
  };

  const handleOnClick = () => {
    if (ctx.products.length > 0) {
      ctx.setSearchBoolean(true);
      ctx.setFilteredProduct(
        ctx.products.filter((product) => product.id == searchID)
      );
    }
  };

  return (
    <>
      <div className="filterInput">
        <input
          type="number"
          min="1"
          max={ctx.totalProducts}
          placeholder="Type ID to search"
          value={searchID}
          onChange={handleIDChange}
        />
        <Button
          variant="contained"
          color="inherit"
          size="medium"
          endIcon={<SearchRounded />}
          disabled={!searchID || inputError}
          onClick={handleOnClick}
        >
          Search
        </Button>
      </div>
      {inputError && (
        <p className="wrongInput">
          Wrong input. Please type a number from 1 to {ctx.totalProducts}.
        </p>
      )}
    </>
  );
};

export default FilterInput;
