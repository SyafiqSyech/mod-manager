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

  const [activeFilters, setActiveFilters] = useState<{
    loaders: string[];
    versions: string[];
    client_side: string | undefined;
    server_side: string | undefined;
  }>({ 
    loaders: [],
    versions: [],
    client_side: undefined,
    server_side: undefined
  });

  const handleApplyFilters = (newFilters: ModSearchFilters) => {
    setFilters(newFilters);
    setOnPage(0);
    setIsFilterOpen(false);
  }

  const handleRemoveFilter = (category: string, id: string) => {
    
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
      
      {/* { activeFilters.loaders.map((loader) => (
        <span key={`loader-${loader}`} className="flex items-center bg-gray-200 rounded px-2 py-1 text-xs">
          {loader}
          <button
            className="ml-1"
            onClick={() => handleRemoveFilter('loaders', loader)}
            aria-label={`Remove loader filter ${loader}`}
          >
            <IconX size={12} />
          </button>
        </span>
      ))}

      { activeFilters.versions.map((version) => (
        <span key={`version-${version}`} className="flex items-center bg-gray-200 rounded px-2 py-1 text-xs">
          {version}
          <button
            className="ml-1"
            onClick={() => handleRemoveFilter('versions', version)}
            aria-label={`Remove version filter ${version}`}
          >
            <IconX size={12} />
          </button>
        </span>
      ))}

      { activeFilters.client_side && (
        <span className="flex items-center bg-gray-200 rounded px-2 py-1 text-xs">
          {activeFilters.client_side}
          <button
            className="ml-1"
            onClick={() => handleRemoveFilter('client_side', activeFilters.client_side ? activeFilters.client_side : '')}
            aria-label={`Remove client side filter ${activeFilters.client_side}`}
          >
            <IconX size={12} />
          </button>
        </span>
      )}

      { activeFilters.server_side && (
        <span className="flex items-center bg-gray-200 rounded px-2 py-1 text-xs">
          {activeFilters.server_side}
          <button
            className="ml-1"
            onClick={() => handleRemoveFilter('server_side', activeFilters.server_side ? activeFilters.server_side : '')}
            aria-label={`Remove server side filter ${activeFilters.server_side}`}
          >
            <IconX size={12} />
          </button>
        </span>
      )} */}

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