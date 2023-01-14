import React, { createContext, useEffect, useState } from 'react';
export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value?: string;
}
interface ProductsContextType {
  products: Product[];
  totalProducts: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  searchBoolean: boolean;
  setSearchBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  filteredProduct: Product[];
  setFilteredProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  totalProducts: 0,
  setPage: () => {},
  totalPages: 0,
  searchBoolean: false,
  setSearchBoolean: () => {},
  filteredProduct: [],
  setFilteredProduct: () => {},
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
  const [searchBoolean, setSearchBoolean] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

  let URL: string;
  if (searchBoolean) {
    URL = `https://reqres.in/api/products?per_page=${totalProducts}`;
  } else {
    URL = `https://reqres.in/api/products?page=${page}&per_page=5`;
  }

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
  }, [page, URL, searchBoolean]);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        totalProducts: totalProducts,
        setPage: setPage,
        totalPages: totalPages,
        searchBoolean: searchBoolean,
        setSearchBoolean: setSearchBoolean,
        filteredProduct: filteredProduct,
        setFilteredProduct: setFilteredProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
