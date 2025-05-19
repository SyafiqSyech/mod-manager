import { useEffect, useState } from 'react';
import { getVersions } from '../services/modrinth';

export const useReleaseVersions = () => {
  const [versions, setVersions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getVersions('release')
      .then(data => {
        setVersions(() => {
          const versionList: string[] = data
            .filter((v: { version: string, version_type: string }) => v.version_type === 'release')
            .map((v: { version: string, version_type: string }) => v.version);
          return versionList;
        });
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { versions, isLoading, error };
};
