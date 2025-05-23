import { getMultipleProjects } from "../services/modrinth";
import { Project } from "../types/project";
import { useEffect, useState } from "react";

export const useMultipleProjects = (ids: string[]) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getMultipleProjects(ids)
      .then(data => {
        setProjects(() => {
          return data.map((item: any) => {
            return {
              id: item.id,
              slug: item.slug,
              title: item.title,
              versions: item.versions,
              client_side: item.client_side,
              server_side: item.server_side,
              loaders: item.loaders,
              imageUrl: item.icon_url,
              downloads: item.downloads,
            };
          });
        });
        setIsLoading(false);
      })
      .catch(err => {
        setError(typeof err === "string" ? err : err?.message || "Unknown error");
        setIsLoading(false);
      });
  }, [ids]);

  return { projects, isLoading, error };
};