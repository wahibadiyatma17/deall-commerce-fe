import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AdvanceFilterType, FilterStoreType } from '../type/filter.type';
import { SelectOptionProps } from '../type/input.type';

export const useProductFilterStore = create<FilterStoreType>()(
  persist(
    (set) => ({
      searchFilter: '',
      categoryFilter: undefined,
      advanceFilter: undefined,

      setSearchFilter: (newSearchFilter: string) =>
        set(() => ({
          searchFilter: newSearchFilter,
        })),
      setCategoryFilter: (newCategoryFilter?: SelectOptionProps) =>
        set(() => ({
          categoryFilter: newCategoryFilter,
        })),
      setAdvanceFilter: (newAdvancedFilter?: AdvanceFilterType) =>
        set(() => ({
          advanceFilter: newAdvancedFilter,
        })),
      clearAdvanceFilter: () =>
        set(() => ({
          advanceFilter: undefined,
        })),
      clearSearchFilter: () =>
        set(() => ({
          searchFilter: undefined,
        })),
      clearCategoryFilter: () =>
        set(() => ({
          categoryFilter: undefined,
        })),
      clearAllFilter: () =>
        set(() => ({
          searchFilter: undefined,
          categoryFilter: undefined,
          advanceFilter: undefined,
        })),
    }),
    { name: 'filter-product', storage: createJSONStorage(() => localStorage) },
  ),
);
