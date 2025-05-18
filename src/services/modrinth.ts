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

export const searchProjects = async (limit: number = 20, offset: number = 0, query: string, facets: string[][]) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { limit, offset, query, facets: JSON.stringify(facets) },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching projects:', error);
    throw error;
  }
};


