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
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-1 xl:gap-10">
        {result?.data?.map((product, index) => (
          <ProductCard2 key={index} product={product} />
        ))}
      </div>

      <div className="w-full flex items-center justify-center mt-6">
        <ReactPaginate
          breakLabel="..."
          previousLabel={<ChevronLeft size={24} />}
          nextLabel={
             <ChevronRight size={24} />
          }
          pageClassName={'py-1.5 px-3'}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={ Math.ceil(result?.meta?.total / result?.meta?.per_page)}
          renderOnZeroPageCount={null}
          containerClassName="pagination flex justify-center mt-4 gap-4"
          activeClassName="active bg-green-primary  text-white"
          previousLinkClassName="previous mr-2 flex items-center justify-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
          nextLinkClassName="next ml-2 flex items-center justify-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
          disabledClassName="disabled opacity-50 cursor-not-allowed"
          initialPage={(parseInt(searchParams.get("page")) || 1) - 1}
        />
      </div>
    </>
  );
};

export default ProductsCollection;
