import React, { useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { styled } from 'twin.macro';

import { TableProps } from '@/commons/type/table.type';
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi';

const Table: React.FC<TableProps> = (props) => {
  const { data, columns, isPaginated = true, onRowClick, hasSortFunction = [''], pageSize } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (!isPaginated) {
      if (!!pageSize) table.setPageSize(pageSize);
      else table.setPageSize(data.length);
    }
  }, [isPaginated, pageSize, data]);

  return (
    <>
      <StyledTable>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (hasSortFunction.includes(header.id))
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        tw="cursor-pointer min-w-[12rem]"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                            tw="flex items-center gap-2"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <BiSortUp size={16} />,
                              desc: <BiSortDown size={16} />,
                            }[header.column.getIsSorted() as string] ?? <BiSort size={16} />}
                          </div>
                        )}
                      </th>
                    );
                  else
                    return (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} tw="hover:bg-gray-100">
                {row.getVisibleCells().map((cell, idx) => {
                  return (
                    <td
                      key={cell.id}
                      style={{
                        cursor:
                          onRowClick && idx !== row.getVisibleCells().length - 1 ? 'pointer' : '',
                      }}
                      onClick={
                        onRowClick && idx !== row.getVisibleCells().length - 1
                          ? () => onRowClick(row)
                          : undefined
                      }
                      data-label={cell.column.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTable>
      {isPaginated && (
        <div tw="my-3 flex flex-col-reverse items-start justify-between px-2 md:(flex-row items-center)">
          <div tw="flex flex-row items-center">
            <p tw="mr-3">Shows rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              tw="bg-white p-2 rounded-[8px]"
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div tw="flex flex-row items-center">
            <span>
              Page{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                <span tw="text-[#2D3748]">{table.getPageCount()}</span>
              </strong>
            </span>
            <div tw="ml-4 flex flex-row items-center">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                tw="mx-1"
              >
                <HiChevronLeft
                  size={24}
                  color={!table.getCanPreviousPage() ? '#BFBFBF' : '#000000'}
                />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                tw="mx-1"
              >
                <HiChevronRight size={24} color={!table.getCanNextPage() ? '#BFBFBF' : '#000000'} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

const StyledTable = styled.div`
  overflow: auto;
  width: 100%;

  table {
    border-spacing: 0;
    border-collapse: separate;
    border: 1px solid #e4e7eb;
    border-radius: 16px;
    width: 100%;
    overflow: auto;
    background-color: #ffffff;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      font-size: 14px;
      padding: 1rem 1.5rem;
      font-weight: 500;
      border-bottom: 1px solid #e4e7eb;
      :last-child {
        border-right: 0;
      }
    }

    th {
      font-weight: 700;
      width: 15rem;
      text-align: left;
      padding: 1rem !important;
    }
  }

  @media screen and (max-width: 1024px) {
    table {
      border: 0;
      background-color: #ffffff;
      width: 100%;

      th {
        width: 100%;
      }
      td {
        border-bottom: 1px solid #e4e7eb;
      }

      th,
      td {
        padding: 0.75rem 0.5rem;
      }
    }

    table caption {
      font-size: 1.3em;
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      display: block;
      margin-bottom: 0.625em;
      border: 2px solid #f0f0f0;
      background-color: #ffffff;
      border-radius: 16px;
      padding: 0.35em;
      margin-bottom: 20px;
    }

    table td {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8em;
      text-align: right;
      border-bottom: 1px solid #e4e7eb;
    }

    table td::before {
      content: attr(data-label);
      float: left;
      text-align: left;

      font-weight: bold;
      text-transform: capitalize;
      max-width: 48%;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;
