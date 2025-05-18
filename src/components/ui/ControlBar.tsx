import React from 'react'
import Pagination from './Pagination'
import { SearchResponseDetails } from '../../types/searchResponseDetails';

interface ControlBarProps {
  details: SearchResponseDetails | undefined;
  itemsPerPage: number;
  onPage: number;
  setOnPage: React.Dispatch<React.SetStateAction<number>>;
}

const ControlBar: React.FC<ControlBarProps> = ({ details, itemsPerPage, onPage, setOnPage }) => {
  return (
    <div>
      <Pagination
        totalItems={details ? details.total_hits : itemsPerPage}
        itemsPerPage={itemsPerPage}
        currentPage={onPage}
        onPageChange={setOnPage}
      />
    </div>
  )
}

export default ControlBar