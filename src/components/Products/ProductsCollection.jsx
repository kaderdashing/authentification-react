import React from 'react';
import ProductCard from './ProductCard';
import { Select, Button, Flex } from '@chakra-ui/react';
import product from '../../assets/product.png';
import ProductCard2 from './ProductCard2';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { BiLeftArrowCircle, BiRightArrowCircle } from 'react-icons/bi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ProductsCollection = ({ result }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  const handlePageClick = (event) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', event.selected + 1);
    setSearchParams(updatedSearchParams.toString());
  };
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:gap-10">
        {result?.data?.map((product, index) => (
          <ProductCard2 key={index} product={product} />
        ))}
      </div>

      <div className="w-full flex items-center justify-center mt-6">
        <ReactPaginate
          breakLabel="..."
          previousLabel={Number(currentPage) === 1 ? null : <ChevronLeft size={24} />}
          nextLabel={
            Number(currentPage) === result?.meta?.total ? null : <ChevronRight size={24} />
          }
          pageClassName={'page-item'}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={result?.meta?.total}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          previousLinkClassName="previous"
          nextLinkClassName="next"
          disabledClassName="disabled"
        />
      </div>
    </>
  );
};

export default ProductsCollection;
