import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../components/TableOfProducts/TableOfProducts';

interface ProductsContextType {
  products: Product[];
  totalProducts: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  totalProducts: 0,
  setPage: () => {},
  totalPages: 0,
});

export const ProductsContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const URL = `https://reqres.in/api/products?page=${page}&per_page=5`;

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(URL);
      if (!res.ok) {
        const err = 'Product not Found';
        throw new Error(err);
      }
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.total_pages);
      setTotalProducts(data.total);
    };
    getProducts();
  }, [page, URL]);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        totalProducts: totalProducts,
        setPage: setPage,
        totalPages: totalPages,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
