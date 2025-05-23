export interface Project {
  id: string;
  slug: string;
  title: string;
  author?: string;
  versions: string[];
  client_side: string;
  server_side: string;
  loaders: string[];
  imageUrl: string;
  downloads: number;
}