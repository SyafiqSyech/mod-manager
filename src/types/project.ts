export interface Project {
  id: string;
  title: string;
  versions: string[];
  client_side: string;
  server_side: string;
  loaders: string[];
  imageUrl: string;
  downloads: number;
}