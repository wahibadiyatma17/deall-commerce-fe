import { cartApiHooks } from '@/commons/api/cart.api';
import { CartProductType } from '@/commons/schema/cart.schema';

import { convertToLimitAndSkip, currencyFormat } from '@/commons/utils';
import Layout from '@/components/Layout';
import { Spinner } from '@chakra-ui/react';
import { Table } from '@/components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { styled } from 'twin.macro';
import { BiArrowBack } from 'react-icons/bi';

const CartDetail: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const router = useRouter();
  const { id } = router.query;
  const cartId: number = parseInt(String(id));

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

  const { data: cartDetailData, isLoading: isCartLoading } = cartApiHooks.useCartDetails({
    params: { id: cartId },
  });

  const columnHelper = createColumnHelper<CartProductType>();

  const columns = [
    columnHelper.accessor('title', {
      header: () => <span tw="font-semibold">Product Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: () => <span tw="font-semibold">Price</span>,
      cell: (info) => currencyFormat(info.getValue()),
    }),
    columnHelper.accessor('discountedPrice', {
      header: () => <span tw="font-semibold">Discounted Price</span>,
      cell: (info) => currencyFormat(info.getValue()),
    }),
    columnHelper.accessor('discountPercentage', {
      header: () => <span tw="font-semibold">Discount Percentage</span>,
      cell: (info) => info.getValue() + ' %',
    }),
    columnHelper.accessor('quantity', {
      header: () => <span tw="font-semibold">Quantity</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('total', {
      header: () => <span tw="font-semibold">Total</span>,
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <Layout>
      <StyledCartDetail>
        <div
          tw="flex w-[max-content]  gap-4 items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack size={28} color="#601bd0" />
          <span tw="text-[#601bd0] text-lg font-medium">Back</span>
        </div>
        <div className="cart__header">
          <h4 tw="text-xl font-semibold w-full text-center">
            Cart {cartDetailData?.id} Detail Information
          </h4>
        </div>
        <div tw="w-full flex flex-col gap-4 items-center max-w-[400px] mx-auto p-4 border-[1px] border-solid border-[#d6c1f9] rounded-xl">
          <div tw="w-full flex justify-between gap-4">
            <span tw="font-semibold text-lg">User Id :</span>

            <span tw="text-base font-medium">{cartDetailData?.userId}</span>
          </div>
          <div tw="w-full flex justify-between gap-4">
            <span tw="font-semibold text-lg">Total :</span>

            <span tw="text-base font-medium">{cartDetailData?.total}</span>
          </div>
          <div tw="w-full flex justify-between gap-4">
            <span tw="font-semibold text-lg">Discounted Total :</span>

            <span tw="text-base font-medium">{cartDetailData?.discountedTotal}</span>
          </div>
          <div tw="w-full flex justify-between gap-4">
            <span tw="font-semibold text-lg">Products Count :</span>

            <span tw="text-base font-medium">{cartDetailData?.totalProducts}</span>
          </div>
          <div tw="w-full flex justify-between gap-4">
            <span tw="font-semibold text-lg">Quantity Count:</span>

            <span tw="text-base font-medium">{cartDetailData?.totalQuantity}</span>
          </div>
        </div>
        <div className="cart__table__container">
          <h4 tw="text-xl font-semibold w-full text-center">
            Cart {cartDetailData?.id} Products Table
          </h4>
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
            <Table data={cartDetailData?.products} columns={columns} isPaginated={false} />
          )}
        </div>
      </StyledCartDetail>
    </Layout>
  );
};

export default CartDetail;

const StyledCartDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;

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
