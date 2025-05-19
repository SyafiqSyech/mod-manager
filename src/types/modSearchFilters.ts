export type Loaders = 'forge' | 'fabric';
export const loadersEnum: Loaders[] = ['forge', 'fabric'];

export type Sides = 'unsupported' | 'required' | 'optional' |  undefined;
export const sidesEnum: Sides[] = ['unsupported', 'required', 'optional'];

export interface ModSearchFilters {
  loaders?: Loaders[];
  versions?: string[];
  client_side?: Sides;
  server_side?: Sides;
  [key: string]: any;
}

export type SortBy = 'relevance' | 'downloads' | 'follows' | 'newest' | 'updated';