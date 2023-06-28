import { addMilliseconds, format } from 'date-fns';
import { IArtist } from '../models/IArtist';
import { IMusic } from '../models/IMusic';
import { IPlaylist } from '../models/IPlaylist';
import { IUser } from '../models/IUser';
import { IAlbum } from '../models/IAlbum';

export function SpotifyUserToModel(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: <string>user.display_name,
    imageURL: <string>user.images?.pop()?.url,
  };
}

export function SpotifyPlaylistToModel(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageURL: <string>playlist?.images?.pop()?.url,
    tracksNumber: playlist.tracks.total,
  };
}

export function SpotifyArtistToModel(
  artist: SpotifyApi.ArtistObjectFull
): IArtist {
  return {
    id: artist.id,
    imageURL: <string>(
      artist.images?.sort((a, b) => <number>a.width - <number>b.width).pop()
        ?.url
    ),
    name: artist.name,
  };
}

export function SpotifyMusicToModel(music: SpotifyApi.TrackObjectFull): IMusic {
  let MsToMinutes: any;
  MsToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };

  return {
    id: music.id,
    uri: music.uri,
    title: music.name,
    album: {
      id: music.album.id,
      imageURL: <string>music.album.images.shift()?.url,
      name: music.album.name,
    },
    artists: music.artists.map((a) => ({
      name: a.name,
      id: a.id,
    })),
    duration: MsToMinutes(music.duration_ms),
  };
}

export function SpotifyAmbumToModel(
  album: SpotifyApi.AlbumObjectSimplified
): IAlbum {
  return {
    title: album.name,
    href: album.href,
    imageURL: <string>(
      album.images?.sort((a, b) => <number>a.width - <number>b.width).pop()?.url
    ),
    id: album.id,
  };
}
