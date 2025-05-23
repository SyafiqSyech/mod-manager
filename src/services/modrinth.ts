import axios from 'axios';

const BASE_URL = 'https://api.modrinth.com/v2';

export const getProject = async (idOrSlug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/project/${idOrSlug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const searchProjects = async (limit: number = 20, offset: number = 0, facets: string[][], query?: string, index?: string) => {
  try {
    const params: Record<string, any> = {
      limit,
      offset,
      facets: JSON.stringify(facets),
    };

    if (query) {
      params.query = query;
    }

    if (index) {
      params.index = index;
    }
    
    const response = await axios.get(`${BASE_URL}/search`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching projects:', error);
    throw error;
  }
};

export const getVersions = async (version_type?: 'release' | 'snapshot' | 'alpha' | 'beta' | null, major?: boolean) => {
  try {
    const params: Record<string, any> = {};

    if (version_type) {
      params.version_type = version_type;
    }

    if (major) {
      params.major = major;
    }

    const response = await axios.get(`${BASE_URL}/tag/game_version`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching versions:', error);
    throw error;
  }
}

export const getMultipleProjects = async (ids: string[]) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects`, {
      params: { ids: JSON.stringify(ids) }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching multiple projects:', error);
    throw error;
  }
}