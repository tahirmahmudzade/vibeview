type Image = {
  height: number;
  url: string;
  width: number;
};

type Artist = Omit<
  DetailedArtist,
  "popularity" | "images" | " genres" | "followers"
>;

export type UserProfile = {
  country: string;
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product?: string;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type DetailedArtist = {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

export type TopEntities<T> = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: T[];
};
