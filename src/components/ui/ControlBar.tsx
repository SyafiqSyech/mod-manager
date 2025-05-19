import React, { useState } from 'react';
import Pagination from './Pagination';
import FilterPopup from './FilterPopup';
import SortPopup from './SortPopup.tsx';
import { SearchResponseDetails } from '../../types/searchResponseDetails';
import { IconX, IconFilter2, IconArrowsSort } from '@tabler/icons-react';
import { ModSearchFilters, SortBy } from '../../types/modSearchFilters';

interface ControlBarProps {
  details: SearchResponseDetails | undefined;
  itemsPerPage: number;
  onPage: number;
  setOnPage: React.Dispatch<React.SetStateAction<number>>;
  filters: ModSearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<ModSearchFilters>>;
  sortBy: SortBy;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
}

const ControlBar: React.FC<ControlBarProps> = ({
  details,
  itemsPerPage,
  onPage,
  setOnPage,
  filters,
  setFilters,
  sortBy,
  setSortBy
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleApplyFilters = (newFilters: ModSearchFilters) => {
    setFilters(newFilters);
    setOnPage(0);
    setIsFilterOpen(false);
  }

  const handleRemoveFilter = (category: string, id: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (category === 'loaders') {
        updatedFilters.loaders = updatedFilters.loaders?.filter((loader: string) => loader !== id);
      } else if (category === 'versions') {
        updatedFilters.versions = updatedFilters.versions?.filter((version: string) => version !== id);
      } else if (category === 'client_side' || category === 'server_side') {
        updatedFilters[category] = undefined;
      }
      return updatedFilters;
    });
  };
  
  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setOnPage(0);
    setIsSortOpen(false);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1 p-2 bg-bg-secondary rounded-md cursor-pointer hover:bg-bg-secondary-muted text-sm"
          >
            <IconFilter2 size={18} />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex items-center gap-1 p-2 bg-bg-secondary rounded-md cursor-pointer hover:bg-bg-secondary-muted text-sm"
          >
            <IconArrowsSort size={18} />
            <span>Sort: <span className='capitalize font-semibold'>{sortBy}</span></span>
          </button>

          {details && (
            <Pagination
              totalItems={details.total_hits}
              itemsPerPage={itemsPerPage}
              currentPage={onPage}
              onPageChange={setOnPage}
            />
          )}
        </div>
      </div>

      <div className='mt-2 flex gap-2 flex-wrap'>
        { filters.loaders?.map((loader) => (
          <div key={`loader-${loader}`} className="px-2 py-0.5 flex gap-1 items-center bg-bg-secondar-muted border-2 border-bg-secondary rounded-full text-xs capitalize">
            {loader}
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveFilter('loaders', loader)}
              aria-label={`Remove loader filter ${loader}`}
            >
              <IconX size={12} className="hover:stroke-contrast"/>
            </div>
          </div>
        ))}

        { filters.versions?.map((version) => (
          <div key={`version-${version}`} className="px-2 py-0.5 flex gap-1 items-center bg-bg-secondar-muted border-2 border-bg-secondary rounded-full text-xs capitalize">
            {version}
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveFilter('versions', version)}
              aria-label={`Remove version filter ${version}`}
            >
              <IconX size={12} className="hover:stroke-contrast"/>
            </div>
          </div>
        ))}

        { filters.client_side && (
          <div className="px-2 py-0.5 flex gap-1 items-center bg-bg-secondar-muted border-2 border-bg-secondary rounded-full text-xs capitalize">
            Client {filters.client_side}
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveFilter('client_side', filters.client_side ? filters.client_side : '')}
              aria-label={`Remove client side filter ${filters.client_side}`}
            >
              <IconX size={12} className="hover:stroke-contrast"/>
            </div>
          </div>
        )}

        { filters.server_side && (
          <div className="px-2 py-0.5 flex gap-1 items-center bg-bg-secondar-muted border-2 border-bg-secondary rounded-full text-xs capitalize">
            Server {filters.server_side}
            <div
              className="cursor-pointer"
              onClick={() => handleRemoveFilter('server_side', filters.server_side ? filters.server_side : '')}
              aria-label={`Remove server side filter ${filters.server_side}`}
            >
              <IconX size={12} className="hover:stroke-contrast"/>
            </div>
          </div>
        )}
      </div>

      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={filters}
        onApplyFilters={handleApplyFilters}
      />

      <SortPopup
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        currentSort={sortBy}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default ControlBar;