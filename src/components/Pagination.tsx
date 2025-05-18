import React from 'react';
import { formatNumber } from '../utilities/numberFormatter';
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
        className={`p-2 rounded-l-lg ` + (currentPage === 0 ? 'bg-[#1e2125]' : 'cursor-pointer bg-[#26292f] hover:bg-[#1e2125]')}
      >
        <IconChevronLeft size={24} stroke={2} className={currentPage === 0 ? 'stroke-gray-600' : 'stroke-gray-400'} />
      </div>
      <div className='flex items-center justify-center px-2 mx-0.5 gap-1 bg-[#26292f]'>
        <div className='p-1 text-gray-400'>
          {currentPage} of {formatNumber(totalPages)}
        </div>
      </div>
      <div
        onClick={() => handlePageChange(currentPage + 1)}
        className={`p-2 rounded-r-lg ` + (currentPage === totalPages - 1 ? 'bg-[#1e2125] stroke-gray-600' : 'cursor-pointer bg-[#26292f] hover:bg-[#1e2125] stroke-gray-400')}
      >
        <IconChevronRight size={24} stroke={2} className={currentPage === totalPages - 1 ? 'stroke-gray-600' : 'stroke-gray-400'} />
      </div>
    </div>
  );
};

export default Pagination;