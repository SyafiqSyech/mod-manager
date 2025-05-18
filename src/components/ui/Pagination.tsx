import React from 'react';
import { formatNumber } from '../../utilities/numberFormatter';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex">
      <div
        onClick={() => handlePageChange(currentPage - 1)}
        className={`p-2 rounded-l-lg ` + (currentPage === 0 ? 'bg-bg-secondary-muted' : 'cursor-pointer bg-bg-secondary hover:bg-bg-secondary-muted')}
      >
        <IconChevronLeft size={24} stroke={2} className={currentPage === 0 ? 'stroke-primary-muted' : 'stroke-primary'} />
      </div>
      <div className='flex items-center justify-center px-2 mx-0.5 gap-1 bg-bg-secondary'>
        <div className='p-1 text-primary'>
          {currentPage} of {formatNumber(totalPages)}
        </div>
      </div>
      <div
        onClick={() => handlePageChange(currentPage + 1)}
        className={`p-2 rounded-r-lg ` + (currentPage === totalPages - 1 ? 'bg-bg-secondary-muted stroke-primary-muted' : 'cursor-pointer bg-bg-secondary hover:bg-bg-secondary-muted stroke-primary')}
      >
        <IconChevronRight size={24} stroke={2} className={currentPage === totalPages - 1 ? 'stroke-primary-muted' : 'stroke-primary'} />
      </div>
    </div>
  );
};

export default Pagination;