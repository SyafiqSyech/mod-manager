import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { SearchResponseDetails } from '../types/searchResponseDetails';
import { searchProjects } from '../services/modrinth';
import { ModSearchFilters, SortBy, loadersEnum } from '../types/modSearchFilters';

export const useModSearch = (
  limit: number = 10,
  offset: number = 0,
  filters: ModSearchFilters = {},
  searchTerm: string,
  sortBy: SortBy = 'relevance'
) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [details, setDetails] = useState<SearchResponseDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);

      const loaders = loadersEnum.map(loader => loader);

      const filterArr: string[][] = [["project_type:mod"]];
      if (filters.loaders && filters.loaders.length > 0) {
        const loadersArr = filters.loaders.map(loader => `categories:${loader}`);
        filterArr.push(loadersArr);
      }
      if (filters.versions && filters.versions.length > 0) {
        const versionsArr = filters.versions.map(version => `versions:${version}`);
        filterArr.push(versionsArr);
      }
      if (filters.client_side) {
        filterArr.push([`client_side:${filters.client_side}`]);
      }
      if (filters.server_side) {
        filterArr.push([`server_side:${filters.server_side}`]);
      }

      searchProjects(limit, offset, filterArr, searchTerm, sortBy)
        .then(data => {
          setProjects(() => {
            return data.hits.map((project: any) => {
              return {
                id: project.project_id,
                title: project.title,
                author: project.author,
                versions: project.versions,
                client_side: project.client_side,
                server_side: project.server_side,
                loaders: loaders.filter(loader => project.display_categories.includes(loader)),
                imageUrl: project.icon_url,
                downloads: project.downloads,
              };
            });
          });
          setDetails({
            total_hits: data.total_hits,
            limit: data.limit,
            offset: data.offset
          })
          setIsLoading(false);
        })
        .catch(err => {
          setError(err);
          setIsLoading(false);
        }
      );
    };

    fetchProjects();
  }, [searchTerm, limit, offset, JSON.stringify(filters), sortBy]);

  return { projects, details, isLoading, error };
};
