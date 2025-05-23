import React from 'react'

interface SearchBarProps {
  setOnPage?: (page: number) => void;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setOnPage, setSearchTerm }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setOnPage) setOnPage(0);
    setSearchTerm(event.target.value);
  }

  return (
    <input
      type="text"
      name="searchInput"
      id="searchInput"
      onChange={handleInputChange}
      placeholder="Search for a project..."
      className="mt-8 w-full px-4 py-4 border border-bg-secondary focus:outline-none rounded-md text-contrast"
    />
  )
}

export default SearchBar