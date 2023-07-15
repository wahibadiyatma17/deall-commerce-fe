import Layout from '@/components/Layout';
import { Select, Spinner } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { styled } from 'twin.macro';

import Input from '@/components/Forms/Text/TextInput';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import TableExample from '@/components/Table/example';

const Product: FC = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const isLoading = false;

  const handlePageSizeChange = (size: number) => {
    setTimeout(() => {
      if (isNaN(size)) setPageSize(10);
      else setPageSize(size);
      setPage(1);
    }, 700);
  };
  return (
    <Layout>
      <StyledProductHome>
        <div className="procurement__header">
          <div tw="flex items-center gap-4 flex-wrap w-full md:w-[unset]">
            <div tw="md:(w-[20rem]) w-full h-[2rem]">
              <Input
                name={'search'}
                type={'text'}
                customPrefix={<FiSearch />}
                placeholder={'Cari judul atau ID pengadaan'}
                value={searchName}
                onChange={(event: any) => {
                  setSearchName(event.target.value);
                  setPage(1);
                }}
                suffix={
                  searchName !== '' && (
                    <IoClose
                      size={20}
                      onClick={() => {
                        setSearchName('');
                        setPage(1);
                      }}
                      tw="cursor-pointer"
                    />
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="procurement__table__container">
          {isLoading ? (
            <div tw="w-full min-h-[20rem] flex flex-col items-center justify-center gap-2">
              <Spinner
                size={'lg'}
                thickness="0.25rem"
                speed="0.5s"
                emptyColor="gray.200"
                color="#EAA249"
              />
              <span tw="text-sm font-semibold text-[#EAA249]">Loading...</span>
            </div>
          ) : (
            <TableExample />
          )}
        </div>
        <Pagination
          currentPage={page}
          onPageChange={(page: number) => setPage(page)}
          onPageSizeChange={(size: number) => handlePageSizeChange(size)}
          pageSize={pageSize}
          maxPage={20}
        />
      </StyledProductHome>
    </Layout>
  );
};

export default Product;

const StyledProductHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .procurement__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .procurement__table__container {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (min-width: 1280px) {
    .procurement__header {
      flex-wrap: nowrap;
      gap: 0rem;
    }
  }
`;
