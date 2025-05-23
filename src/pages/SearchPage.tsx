import React from 'react'
import { useState, useCallback, useEffect } from 'react';
import { useModSearch } from '../hooks/useModSearch';
import { useDebounce } from '../hooks/useDebounce';
import { ModSearchFilters, SortBy } from '../types/modSearchFilters';
import ModCard from '../components/ModCard/ModCard';
import ControlBar from '../components/ui/ControlBar';
import SearchBar from '../components/ui/SearchBar';
import NavBar from '../components/ui/NavBar';

const SearchPage = () => {
  const itemsPerPage = 20;
  const [onPage, setOnPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<ModSearchFilters>({});
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [listedMods, setListedMods] = useState<string[]>([]);

  useEffect(() => {
    try {
      const modsFromStorage = JSON.parse(localStorage.getItem('mods') || '[]');
      if (Array.isArray(modsFromStorage)) {
        setListedMods(modsFromStorage);
      }
    } catch {
      setListedMods([]);
    }
  }, []);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 300);
  const debouncedOnPage = useDebounce<number>(onPage, 300);
  const debouncedFilters = useDebounce<ModSearchFilters>(filters, 300);
  const debouncedSortBy = useDebounce<SortBy>(sortBy, 300);

  const { projects, details, isLoading, error } = useModSearch(
    itemsPerPage,
    itemsPerPage * debouncedOnPage,
    debouncedFilters,
    debouncedSearchTerm,
    debouncedSortBy
  );

  const addMod = useCallback((modId: string) => {
    setListedMods(prevMods => {
      if (prevMods.includes(modId)) return prevMods;

      const newMods = [...prevMods, modId];
      localStorage.setItem('mods', JSON.stringify(newMods));
      window.dispatchEvent(new Event('modsUpdated'));
      return newMods;
    });
  }, []);

  const removeMod = useCallback((modId: string) => {
    setListedMods(prevMods => {
      const newMods = prevMods.filter(id => id !== modId);
      localStorage.setItem('mods', JSON.stringify(newMods));
      window.dispatchEvent(new Event('modsUpdated'));
      return newMods;
    });
  }, []);

  const isListed = useCallback((projectId: string) => {
    return listedMods.includes(projectId);
  }, [listedMods]);

  return (
    <>
      <NavBar onPage='search' />
      <SearchBar
        setOnPage={setOnPage}
        setSearchTerm={setSearchTerm}
      />
      <ControlBar
        details={details}
        itemsPerPage={itemsPerPage}
        onPage={onPage}
        setOnPage={setOnPage}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="mt-4 flex flex-col gap-2">
        {isLoading ? (
          <p className="text-contrast h-screen">Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500">Error: {error}</p>}
            {projects.length === 0 && !error && (
              <p className="text-contrast">No projects found.</p>
            )}
            {projects.map((project) => (
              <ModCard
                key={project.id}
                project={project}
                isListed={isListed(project.id)}
                onAdd={addMod}
                onRemove={removeMod}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default SearchPage