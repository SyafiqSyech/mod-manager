import { useEffect, useState } from 'react';
import { getProject } from '../services/modrinth';
import { Project } from '../types/project.ts';

export const useProject = (idOrSlug: string) => {
  const [project, setProject] = useState<Project|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getProject(idOrSlug)
      .then(data => {
        setProject(() => {
          const projectData: Project = {
            id: data.id,
            title: data.title,
            versions: data.versions,
            client_side: data.client_side,
            server_side: data.server_side,
            loaders: data.loaders,
            imageUrl: data.icon_url,
          };
          return projectData;
        });
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [idOrSlug]);

  return { project, isLoading, error };
};
