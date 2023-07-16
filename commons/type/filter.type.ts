import { SelectOptionProps } from './input.type';

export interface AdvanceFilterType {
  brand?: SelectOptionProps[];
  product?: SelectOptionProps[];
  price?: {
    min_price?: string;
    max_price?: string;
  };
}

export type FilterStoreType = {
  searchFilter: string;
  categoryFilter?: SelectOptionProps;
  advanceFilter?: AdvanceFilterType;

  setSearchFilter: (searchFilter: string) => void;
  setCategoryFilter: (categoryFilter?: SelectOptionProps) => void;
  setAdvanceFilter: (advancedFilter?: AdvanceFilterType) => void;
  clearCategoryFilter: () => void;
  clearSearchFilter: () => void;
  clearAdvanceFilter: () => void;
  clearAllFilter: () => void;
};
