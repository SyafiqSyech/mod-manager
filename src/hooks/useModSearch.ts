import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { SearchResponseDetails } from '../types/searchResponseDetails';
import { searchProjects } from '../services/modrinth';

export const useModSearch = (searchTerm: string, limit: number = 10, offset: number = 0) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [details, setDetails] = useState<SearchResponseDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      searchProjects(limit, offset, searchTerm, [["project_type:mod"]])
        .then(data => {
          setProjects(() => {
            return data.hits.map((project: any) => {
              const loaders = ['Fabric', 'Forge'].filter(loader => project.display_categories.includes(loader.toLowerCase()));
              const versions = ['1.20.1', '1.21.1'].filter(version => project.versions.includes(version));
              return {
                id: project.project_id,
                title: project.title,
                versions: versions.length > 0 ? versions : ['NONE'],
                client_side: project.client_side,
                server_side: project.server_side,
                loaders: loaders.map(loader => loader.toLowerCase()),
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
  }, [searchTerm, limit, offset]);

  return { projects, details, isLoading, error };
};
