export interface BasePaginationProps {
  maxPage: number;
  pageSize: number;
  currentPage: number;
}

export interface PaginationProps extends BasePaginationProps {
  onPageChange: (currentPage: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export type UsePaginationProps = {
  totalPage: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

export type StyledPaginationProps = {
  index: number;
  currentPage: number;
};

export interface PaginationParams {
  page: number;
  page_size: number;
}

export interface PaginationResult {
  limit: number;
  skip: number;
}
