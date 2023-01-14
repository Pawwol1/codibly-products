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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  searchBoolean: boolean;
  setSearchBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  filteredProduct: Product[];
  setFilteredProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  totalProducts: 0,
  page: 0,
  setPage: () => {},
  totalPages: 0,
  searchBoolean: false,
  setSearchBoolean: () => {},
  filteredProduct: [],
  setFilteredProduct: () => {},
  isLoading: true,
  setIsLoading: () => {},
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
  const [totalProducts, setTotalProducts] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [URL, setURL] = useState(
    `https://reqres.in/api/products?page=${page}&per_page=5`
  );
  const [searchBoolean, setSearchBoolean] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchBoolean
      ? setURL(`https://reqres.in/api/products?per_page=${totalProducts}`)
      : setURL(`https://reqres.in/api/products?page=${page}&per_page=5`);
  }, [searchBoolean, totalProducts, page]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          const err = 'Product not Found';
          throw new Error(err);
        }
        const data = await res.json();
        setProducts(data.data);
        setTotalPages(data.total_pages);
        setTotalProducts(data.total);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
    setIsLoading(true);
  }, [URL]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [isLoading]);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        totalProducts: totalProducts,
        page: page,
        setPage: setPage,
        totalPages: totalPages,
        searchBoolean: searchBoolean,
        setSearchBoolean: setSearchBoolean,
        filteredProduct: filteredProduct,
        setFilteredProduct: setFilteredProduct,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
