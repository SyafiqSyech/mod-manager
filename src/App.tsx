import { useState, useCallback } from 'react';
import { useModSearch } from './hooks/useModSearch';
import { useDebounce } from './hooks/useDebounce';
import { ModCard } from './components/ModCard/ModCard';
import Pagination from './components/ui/Pagination';
import ControlBar from './components/ui/ControlBar';

function App() {
  const itemsPerPage = 20;

  const [onPage, setOnPage] = useState<number>(0);
  const debouncedOnPage = useDebounce<number>(onPage, 300);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 300);

  const { projects, details, isLoading, error } = useModSearch(debouncedSearchTerm, itemsPerPage, itemsPerPage * debouncedOnPage);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOnPage(0);
    setSearchTerm(event.target.value);
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto my-48">
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        onChange={handleInputChange}
        placeholder="Search for a project..."
        className="mt-8 w-full px-4 py-4 border border-bg-secondary focus:outline-none rounded-md text-contrast"
      />
      <ControlBar
        details={details}
        itemsPerPage={itemsPerPage}
        onPage={onPage}
        setOnPage={setOnPage}
      />
      <div className="pt-4 flex flex-col gap-2">
        {isLoading ? (
          <p className="text-contrast h-screen">Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500">Error: {error}</p>}
            {projects.length === 0 && !error && (
              <p className="text-contrast">No projects found.</p>
            )}
            {projects.map((project) => (
              <ModCard key={project.id} project={project} isListed={project.title[0] == "F" ? true : false} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default App
