import React from 'react';
import Popup from './Popup';
import { SortBy } from '../../types/modSearchFilters';

interface SortPopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'downloads', label: 'Most Downloads' },
];

const SortPopup: React.FC<SortPopupProps> = ({ isOpen, onClose, currentSort, onSortChange }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Sort By">
      <div className="space-y-2">
        {sortOptions.map(option => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer p-2">
            <input
              type="radio"
              name="sortOption"
              checked={currentSort === option.value}
              onChange={() => onSortChange(option.value)}
              className="form-radio text-accent"
            />
            <span className="text-primary">{option.label}</span>
          </label>
        ))}
      </div>
    </Popup>
  );
};

export default SortPopup;