import { ColumnDef } from '@tanstack/react-table';

export interface BaseTableProps {
  data: any;
  columns: ColumnDef<any, any>[];
  isPaginated?: boolean;
  onRowClick?: (row: any) => void;
  hasSortFunction?: Array<string>;
  pageSize?: number;
}

export type TableProps = BaseTableProps;
