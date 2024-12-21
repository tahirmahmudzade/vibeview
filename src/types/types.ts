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

export type Entities<T> = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: T[];
};

export type Terms = "short_term" | "medium_term" | "long_term";

export type RecentlyPlayedTrack = {
  track: Track;
  played_at: string;
  context: {
    type: string;
    href: string | null;
    external_urls: { spotify: string };
    uri: string;
  } | null;
};

export type RecentlyPlayedTracksResponse = {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: RecentlyPlayedTrack[];
};

export type PlaylistImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type PlaylistOwner = {
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
};

export type PlaylistTracksInfo = {
  href: string;
  total: number;
};

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: PlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  tracks: PlaylistTracksInfo;
  type: string;
  uri: string;
};

export type PaginationCursors = {
  after: string | null; // Cursor for the next page
  before: string | null; // Cursor for the previous page
};

export type UserPlaylistsResponse = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist[];
};

export type FollowedArtistsResponse = {
  artists: {
    href: string; // URL for the API request
    limit: number; // Number of items per page
    next: string | null; // URL for the next page
    cursors: PaginationCursors; // Cursors for pagination
    total: number; // Total number of followed artists
    items: DetailedArtist[]; // Array of followed artists
  };
};

export type AlbumCopyright = {
  text: string; // Copyright text
  type: string; // Type of copyright (e.g., "C" or "P")
};

export type AlbumExternalIds = {
  isrc?: string; // International Standard Recording Code
  ean?: string; // International Article Number
  upc?: string; // Universal Product Code
};

export type AlbumTrack = {
  artists: Artist[]; // Reuse the existing Artist type
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type AlbumTracks = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: AlbumTrack[];
};

export type DetailedAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[]; // Reuse existing Image type
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: { reason: string };
  type: "album";
  uri: string;
  artists: Artist[]; // Reuse the existing Artist type
  tracks: AlbumTracks; // Nested tracks information
  copyrights: AlbumCopyright[];
  external_ids: AlbumExternalIds;
  genres: string[];
  label: string;
  popularity: number; // Album's popularity score
};

export type SavedAlbum = {
  added_at: string; // When the album was added to the library
  album: DetailedAlbum; // Detailed album information
};

export type UserSavedAlbumsResponse = {
  href: string; // API endpoint
  limit: number; // Number of items per page
  next: string | null; // URL for the next page
  offset: number; // Offset for pagination
  previous: string | null; // URL for the previous page
  total: number; // Total number of saved albums
  items: SavedAlbum[]; // List of saved albums
};
