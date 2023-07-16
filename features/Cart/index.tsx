import { cartApiHooks } from '@/commons/api/cart.api';
import { CartType } from '@/commons/schema/cart.schema';

import Layout from '@/components/Layout';
import { Pagination } from '@/components/Pagination';
import { Spinner } from '@chakra-ui/react';
import { Table } from '@/components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import React, { FC, useCallback, useState } from 'react';
import { styled } from 'twin.macro';
import { convertToLimitAndSkip } from '@/commons/utils';
import { useRouter } from 'next/router';

const Cart: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const router = useRouter();

  const handlePageSizeChange = (size: number) => {
    setTimeout(() => {
      if (isNaN(size)) setPageSize(10);
      else setPageSize(size);
      setPage(1);
    }, 700);
  };

  const convertedPaginationParams = useCallback(
    () => convertToLimitAndSkip({ page: page, page_size: pageSize }),
    [page, pageSize],
  );

  const { data: cartData, isLoading: isCartLoading } = cartApiHooks.useAllCart({
    queries: {
      limit: convertedPaginationParams().limit,
      skip: convertedPaginationParams().skip,
    },
  });

  const maxPaginationPage = cartData?.total! / pageSize;

  const columnHelper = createColumnHelper<CartType & { action: string }>();

  const columns = [
    columnHelper.accessor('userId', {
      header: () => <span tw="font-semibold">User Id</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('totalProducts', {
      header: () => <span tw="font-semibold">Total Product</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('totalQuantity', {
      header: () => <span tw="font-semibold">Total Quantity</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discountedTotal', {
      header: () => <span tw="font-semibold">Discounted Total</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('action', {
      header: () => <span tw="font-semibold">Action</span>,
      cell: (info) => {
        return (
          <button
            className="button__detail"
            onClick={() => router.push(`/cart/${info.row.original.id}`)}
          >
            See Details
          </button>
        );
      },
    }),
  ];
  return (
    <Layout>
      <StyledCart>
        <div className="cart__table__container">
          {isCartLoading ? (
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
              <Table data={cartData?.carts} columns={columns} isPaginated={false} />
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
      </StyledCart>
    </Layout>
  );
};

export default Cart;

const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .cart__header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .cart__table__container {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .button__detail {
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
      color: #fff;
      background-color: #601bd0;
    }

    border: 1px solid #601bd0;
    border-radius: 12px;

    color: #601bd0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }

  @media (min-width: 80rem) {
    .cart__header {
      flex-wrap: nowrap;
      gap: 0px;
    }
  }
`;
