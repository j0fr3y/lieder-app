export interface File {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number | null;
      height: number | null;
      formats: null; // You can extend this if needed
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
      related: Array<{
        __type: string;
        id: number;
        title: string;
        lyrics: string;
        createdAt: string;
        updatedAt: string;
      }>;
    };
  };
}

export interface Song {
  id: number;
  attributes: {
    title: string;
    lyrics: string | null;
    tags: string | null;
    createdAt: string;
    updatedAt: string;
    minAge: number | null;
    maxAge: number | null;
    artists: {
      data: Artist[];
    };
    file: File;
  };
}

export interface Artist {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Image {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: ImageFormat;
        large: ImageFormat;
        medium: ImageFormat;
        small: ImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface SongsApiResponse {
  data: Song[];
  meta: Meta;
}

export interface SongApiResponse {
  data: Song;
  meta: Meta;
}
