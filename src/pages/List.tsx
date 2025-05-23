import { useState, useEffect, useCallback, useMemo } from 'react';
import NavBar from '../components/ui/NavBar'
import SearchBar from '../components/ui/SearchBar'
import { IconDeviceDesktop, IconExternalLink, IconTrash, IconServer2 } from '@tabler/icons-react';
import { useMultipleProjects } from '../hooks/useMultipleProjects';
import { Project } from '../types/project';

const List = () => {
  const [modIds, setModIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cachedProjects, setCachedProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const modsFromStorage = JSON.parse(localStorage.getItem('mods') || '[]');
      if (Array.isArray(modsFromStorage)) {
        setModIds(modsFromStorage);
      }
    } catch (error) {
      console.error('Failed to load mods from storage:', error);
      setModIds([]);
    }
  }, []);

  const { projects, isLoading, error } = useMultipleProjects(modIds);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setCachedProjects(projects);
    }
  }, [projects]);

  const removeMod = useCallback((modId: string) => {
    setModIds(prevMods => {
      const newMods = prevMods.filter(id => id !== modId);
      localStorage.setItem('mods', JSON.stringify(newMods));
      if (newMods.length === 0) {
        setCachedProjects([]);
      }
      window.dispatchEvent(new Event('modsUpdated'));
      return newMods;
    });
  }, []);

  const displayProjects = projects.length > 0 ? projects : cachedProjects;

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return displayProjects;
    return displayProjects.filter((project: Project) =>
      project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [displayProjects, searchTerm]);

  return (
    <>
      <NavBar onPage='list' />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="container mx-auto mt-4 min-h-[calc(100vh-10rem)]">
        <table className="w-full border-collapse">
            <colgroup>
            <col className="w-[1%]" />
            <col className="w-[70%]" />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
            <col className="w-[1%]" />
            </colgroup>
          <thead className='bg-bg-secondary'>
            <tr>
              <th className="px-2 py-1 text-left">#</th>
              <th className="px-2 py-1 text-left">Title</th>
              <th className="px-2 py-1 text-left">
                <span className="flex items-center gap-1">
                  <IconDeviceDesktop size={18} /> Client
                </span>
              </th>
              <th className="px-2 py-1 text-left">
                <span className="flex items-center gap-1">
                  <IconServer2 size={18} /> Server
                </span>
              </th>
              <th className='px-2 py-1 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading mods...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-danger">
                  Error loading mods: {error || "Unknown error"}
                </td>
              </tr>
            )}

            {!isLoading && !error && filteredProjects.length === 0 && searchTerm && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No matching projects found.
                </td>
              </tr>
            )}

            {!isLoading && !error && filteredProjects.length === 0 && !searchTerm && modIds.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No mods added yet. Add mods from the Search page.
                </td>
              </tr>
            )}

            {!isLoading && filteredProjects.map((project: Project, index: number) => (
              <tr key={project.id} className="border-b border-bg-secondary hover:bg-bg-secondary-muted">
                <td className="px-2 py-1 text-left">{index + 1}</td>
                <td className="px-2 py-1 flex gap-2 items-center">
                  <img src={project.imageUrl} alt='Mod Image' className='w-8 h-8 rounded-lg border-1 border-[#44464f] bg-[#33363d]' />
                  <div className='flex flex-col overflow-hidden'>
                    <p className='font-semibold text-contrast' title={project.title}>{project.title}</p>
                  </div>
                </td>
                <td className={`px-2 py-1 font-bold ` + (project.client_side == 'unknown' ? 'text-danger' : '') + (project.client_side == 'required' ? 'text-accent' : '') + (project.client_side == 'optional' ? 'text-attention' : '')}>
                  {project.client_side == 'unsupported' ? '-' : project.client_side.charAt(0).toUpperCase() + project.client_side.slice(1)}
                </td>
                <td className={`px-2 py-1 font-bold ` + (project.server_side == 'unknown' ? 'text-danger' : '') + (project.server_side == 'required' ? 'text-accent' : '') + (project.server_side == 'optional' ? 'text-attention' : '')}>
                  {project.server_side == 'unsupported' ? '-' : project.server_side.charAt(0).toUpperCase() + project.server_side.slice(1)}
                </td>
                <td className="px-2 py-1">
                  <div className='flex gap-2'>
                    <IconExternalLink
                      className='stroke-primary-muted hover:stroke-primary cursor-pointer'
                      size={24}
                      stroke={2}
                      onClick={() => {
                        window.open(`https://modrinth.com/mod/${project.slug}`, '_blank');
                      }}
                    />
                    <IconTrash
                      className='stroke-primary-muted hover:stroke-danger cursor-pointer'
                      size={24}
                      stroke={2}
                      onClick={() => {
                        removeMod(project.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
