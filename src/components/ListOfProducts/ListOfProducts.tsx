import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import './ListOfProducts.scss';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value?: string;
}

const ListOfProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const URL = `https://reqres.in/api/products?page=${page}`;

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(URL);
      if (!res.ok) {
        const err = 'Product not Found';
        throw new Error(err);
      }
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.total_pages);
    };
    getUsers();
  }, [page, URL]);

  return (
    <>
      <div className="listOfProducts">
        {products.length ? (
          products.map((product) => {
            return (
              <div style={{ backgroundColor: product.color }} key={product.id}>
                <div className="listOfProducts__product">
                  <Link to={`/product/${product.id}`}>
                    <p>ID: {product.id}</p>
                    <p>Name: {product.name}</p>
                    <p>Year: {product.year}</p>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p
            style={{
              fontSize: '2rem',
              color: 'red',
            }}
          >
            Products not found
          </p>
        )}
      </div>
      <PaginationComponent totalPages={totalPages} setPage={setPage} />
    </>
  );
};

export default ListOfProducts;
