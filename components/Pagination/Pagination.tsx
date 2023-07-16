import { FC } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { styled } from 'twin.macro';

import { DOTS, usePagination } from 'commons/hooks/pagination.hooks';
import { PaginationProps, StyledPaginationProps } from 'commons/type/pagination.type';

const Pagination: FC<PaginationProps> = (props) => {
  const { maxPage, pageSize, currentPage, onPageChange, onPageSizeChange } = props;

  const onPrevious = () => {
    currentPage === 1 ? onPageChange(1) : onPageChange(currentPage - 1);
  };

  const onNext = () => {
    currentPage === maxPage ? onPageChange(maxPage) : onPageChange(currentPage + 1);
  };

  const paginationRange = usePagination({
    currentPage: currentPage,
    totalPage: maxPage,
    siblingCount: 1,
    pageSize: pageSize,
  });

  return (
    <StyledPagination>
      <div>
        <span className="page-size-text">
          Halaman <span tw="font-bold">{currentPage}</span> dari total{' '}
          <span tw="font-bold">{maxPage}</span> halaman
        </span>
      </div>
      <div className="pagination-container">
        <div className="page-size-controller">
          <p className="page-size-text">Jumlah baris per halaman</p>
          <div className="number-input-wrapper">
            <select
              id="pagesize"
              name="pagesize"
              className="number-input"
              defaultValue={pageSize}
              onChange={(event) => onPageSizeChange(parseInt(event.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div role="button" className="arrow-wrapper" onClick={() => onPrevious()}>
          <FiChevronLeft />
        </div>
        {paginationRange?.map((pageNumber, index) => {
          if (typeof pageNumber !== 'number') {
            return (
              <li className="list" key={index}>
                <button className="dot-wrapper">{DOTS}</button>
              </li>
            );
          }

          return (
            <li className="list" key={index}>
              <StyledPageNumber
                onClick={() => onPageChange(pageNumber)}
                currentPage={currentPage}
                index={pageNumber}
              >
                {pageNumber}
              </StyledPageNumber>
            </li>
          );
        })}
        <div role="button" className="arrow-wrapper" onClick={() => onNext()}>
          <FiChevronLeft className="arrow-right" />
        </div>
      </div>
    </StyledPagination>
  );
};

export default Pagination;

export const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-size-controller {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 1.25rem;

      .number-input-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.375rem 0.5rem;
        background: #ffffff;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        cursor: pointer;

        max-width: 4rem;
        max-height: 2rem;
      }

      .number-input {
        max-width: 2.75rem;
        max-height: 2rem;
        border: none;
        cursor: pointer;

        :focus {
          outline: none;
        }

        ::-webkit-inner-spin-button {
          opacity: 1;
        }
      }
    }
  }

  .page-size-text {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #000000;
    margin-right: 1rem;
  }

  .pagination-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 1.875rem;
    height: 1.875rem;
    background-color: #d6c1f9;
    color: #601bd0;
    margin: 0 0.25rem;
    cursor: pointer;
  }

  .dot-wrapper {
    padding: 0.5rem 0.75rem;
    margin-left: 0;
    line-height: 1.25rem;
    border: none;
    border-radius: 0.125rem;

    font-size: 0.625rem;
    font-weight: 600;
    color: #601bd0;
    background-color: #ffffff;

    @media and (min-width: 1024px) {
      font-size: 0.875rem;
    }
  }

  .arrow-right {
    transform: rotate(180deg);
  }

  .list {
    list-style-type: none;
  }
`;

export const StyledPageNumber = styled.button<StyledPaginationProps>`
  color: ${(props) => (props.currentPage === props.index ? '#FFFFFF' : '#601BD0')};
  background-color: ${(props) => (props.currentPage === props.index ? '#601BD0' : '#FFFFFF')};

  width: 2rem;
  height: 1.875rem;
  margin: 0 0.25rem;
  border-radius: 0.125rem;

  line-height: 1.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #601bd0;
    color: #ffffff;
  }
`;
