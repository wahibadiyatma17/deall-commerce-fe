import Layout from '@/components/Layout';
import { Spinner } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { css, styled } from 'twin.macro';

import { productApiHooks } from '@/commons/api/product.api';
import { ProductType } from '@/commons/schema/product.schema';
import { convertToLimitAndSkip, convertToTitleCase, currencyFormat } from '@/commons/utils';
import Input from '@/components/Forms/Text/TextInput';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { useDebounce } from 'usehooks-ts';
import FilterModal from './component/FilterModal';

const Product: FC = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filterActive, setFilterActive] = useState<Array<string>>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const handlePageSizeChange = (size: number) => {
    setTimeout(() => {
      if (isNaN(size)) setPageSize(10);
      else setPageSize(size);
      setPage(1);
    }, 700);
  };

  const debounceSearchProduct = useDebounce(searchProduct, 700);
  const convertedPaginationParams = useCallback(
    () => convertToLimitAndSkip({ page: page, page_size: pageSize }),
    [page, pageSize, debounceSearchProduct],
  );

  const { data: productData, isLoading: isProductLoading } = productApiHooks.useSearchAllProducts({
    queries: {
      q: debounceSearchProduct,
      limit: convertedPaginationParams().limit,
      skip: convertedPaginationParams().skip,
    },
  });

  const maxPaginationPage = productData?.total! / pageSize;

  const columnHelper = createColumnHelper<ProductType>();

  const columns = [
    columnHelper.accessor('title', {
      header: () => <span tw="font-semibold">Product Name</span>,
      cell: (info) => convertToTitleCase(info.getValue()),
    }),
    columnHelper.accessor('brand', {
      header: () => <span tw="font-semibold">Brand</span>,
      cell: (info) => convertToTitleCase(info.getValue()),
    }),
    columnHelper.accessor('price', {
      header: () => <span tw="font-semibold">Price</span>,
      cell: (info) => currencyFormat(info.getValue()),
    }),
    columnHelper.accessor('stock', {
      header: () => <span tw="font-semibold">Stock</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('category', {
      header: () => <span tw="font-semibold">Category</span>,
      cell: (info) => convertToTitleCase(info.getValue()),
    }),
  ];

  return (
    <Layout>
      <StyledProductHome>
        <div className="procurement__header">
          <div tw="flex items-center gap-4 flex-wrap justify-between w-full ">
            <div tw="md:(w-[320px]) w-full h-[32px]">
              <Input
                name={'search'}
                type={'text'}
                customPrefix={<FiSearch />}
                placeholder={'Search product title'}
                value={searchProduct}
                onChange={(event: any) => {
                  setSearchProduct(event.target.value);
                  setPage(1);
                }}
                suffix={
                  searchProduct !== '' && (
                    <IoClose
                      size={20}
                      onClick={() => {
                        setSearchProduct('');
                      }}
                      tw="cursor-pointer"
                    />
                  )
                }
              />
            </div>
            <div
              css={classesCategoryFilterCss(filterActive.length !== 0)}
              onClick={() => setIsFilterModalOpen(true)}
            >
              <FiFilter size={24} color={filterActive.length !== 0 ? '#fff' : '#601bd0'} />

              <span>Advanced Filter</span>
            </div>
          </div>
        </div>
        <div className="procurement__table__container">
          {isProductLoading ? (
            <div tw="w-full min-h-[320px] flex flex-col items-center justify-center gap-2">
              <Spinner
                size={'lg'}
                thickness="4px"
                speed="0.5s"
                emptyColor="gray.200"
                color="#601BD0"
              />
              <span tw="text-sm font-semibold text-[#601BD0]">Loading...</span>
            </div>
          ) : (
            <>
              <Table data={productData?.products} columns={columns} isPaginated={false} />
              <Pagination
                currentPage={page}
                onPageChange={(page: number) => setPage(page)}
                onPageSizeChange={(size: number) => handlePageSizeChange(size)}
                pageSize={pageSize}
                maxPage={maxPaginationPage}
              />
            </>
          )}
        </div>
      </StyledProductHome>
      {isFilterModalOpen && (
        <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
      )}
    </Layout>
  );
};

export default Product;

const StyledProductHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .procurement__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .procurement__table__container {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media (min-width: 80rem) {
    .procurement__header {
      flex-wrap: nowrap;
      gap: 0px;
    }
  }
`;

const classesCategoryFilterCss = (isFilterActive: boolean) => css`
  display: flex;
  padding: 0.25rem 0.5rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 12px;
  background: ${isFilterActive ? '#601bd0' : '#fff'};
  height: max-content;
  width: max-content;
  cursor: pointer;
  border: 1px solid #601bd0;

  span {
    color: ${isFilterActive ? '#fff' : '#601bd0'};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }
  &:hover {
    transform: scale(1.05);
  }
`;
