import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Products/SearchBar';
import Filters from '../components/Products/Filters';
import ProductsCollection from '../components/Products/ProductsCollection';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function List() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(null);

  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    setLoadingData(true);
    const getProductsByCategory = async () => {
      if (searchParams.get('page')) {
        await axios
          .get(`${import.meta.env.VITE_REACT_API_URL}/products/category`, {
            params: {
              category: searchParams.get('category'),
              page: searchParams.get('page')
            }
          })
          .then((res) => {
            setResult(res.data);
            setLoadingData(false);
          })
          .catch((e) => {
            setErrorData(e);
          });
      } else
        await axios
          .get(`${import.meta.env.VITE_REACT_API_URL}/products/category`, {
            params: {
              category: searchParams.get('category')
            }
          })
          .then((res) => {
            setResult(res.data);
            setLoadingData(false);
          })
          .catch((e) => {
            setErrorData(e);
          });
    };

    const getProducts = async () => {
      if (searchParams.get('page')) {
        await axios
          .get(`${import.meta.env.VITE_REACT_API_URL}/products`, {
            params: {
              page: searchParams.get('page')
            }
          })
          .then((res) => {
            setResult(res.data);
            setLoadingData(false);
          })
          .catch((e) => {
            setErrorData(e);
          });
      } else
        await axios
          .get(`${import.meta.env.VITE_REACT_API_URL}/products`)
          .then((res) => {
            setResult(res.data);
            setLoadingData(false);
          })
          .catch((e) => {
            setErrorData(e);
          });
    };
    if (searchParams.get('category')) {
      getProductsByCategory();
    } else {
      getProducts();
    }
  }, [searchParams]);
  return (
    <div className="wrapper">
      <SearchBar />
      <Filters />
      {loadingData ? (
        <div className='h-full flex items-center justify-center mt-12'>
        <ClipLoader
          color={"black"}
          loading={loadingData}
          //cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </div>
      ) : (
        <div className="mt-8">
          <ProductsCollection result={result} />
        </div>
      )}
    </div>
  );
}
