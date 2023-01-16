import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsContext from '../../context/products-context';
import './FilterInput.scss';

const FilterInput = () => {
  const [searchID, setSearchID] = useState<string | number>('');
  const [inputError, setInputError] = useState(false);
  const ctx = useContext(ProductsContext);
  const navigate = useNavigate();
  const { filterID } = useParams();

  useEffect(() => {
    if (searchID !== '') {
      setInputError(searchID < 1 || searchID > ctx.totalProducts);
    }
    if (filterID) {
      ctx.setSearchBoolean(true);
      ctx.setFilteredProduct(
        ctx.products.filter((product) => product.id === Number(filterID))
      );
    } else {
      ctx.setSearchBoolean(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchID, filterID, ctx.products]);

  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    const limit = 2;
    const result = e.currentTarget.value.replace(/\D/g, '').slice(0, limit);
    setSearchID(result);
  };

  const handleOnClick = (searchID: number) => {
    if (ctx.products.length > 0) {
      ctx.setFilteredProduct(
        ctx.products.filter((product) => product.id === searchID)
      );
      navigate(`/filter/${searchID}`);
    }
    setSearchID('');
  };

  return (
    <>
      <div className="filterInput">
        <input
          type="text"
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
          onClick={() => handleOnClick(Number(searchID))}
        >
          Search
        </Button>
      </div>
      {inputError && (
        <p className="filterInput__wrongInput" data-testid="wrongInput">
          Wrong input. Please type a number from 1 to {ctx.totalProducts}.
        </p>
      )}
    </>
  );
};

export default FilterInput;
