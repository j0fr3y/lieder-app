export interface File {
  id: number;
  readonly name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any; // You might want to define a type for formats
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any; // You might want to define a type for provider_metadata
  folderPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  _meilisearch_id: string;
  id: number;
  title: string;
  lyrics: string | null;
  tags: string | null;
  createdAt: string;
  updatedAt: string;
  minAge: number | null;
  maxAge: number | null;
  file: File;
  artists: Artist[];
}
