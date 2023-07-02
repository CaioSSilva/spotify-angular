import { IPlaylist } from './../models/IPlaylist';
import { IArtist } from '../models/IArtist';
import { IUser } from '../models/IUser';
import { IMusic } from '../models/IMusic';
import { IAlbum } from '../models/IAlbum';

export function newUser(): IUser {
  return {
    id: '',
    name: '',
    imageURL: '',
  };
}
export function newPlaylist(): IPlaylist {
  return {
    id: '',
    name: '',
    imageURL: '',
    tracksNumber: 0,
  };
}

export function newArtist(): IArtist {
  return {
    id: '',
    name: '',
    imageURL: '',
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    uri: '',
    title: 'Play Something...',
    artists: [{ name: 'Spotify', id: 'ghdgshdfg2we7e' }],
    album: {
      id: '',
      name: '',
      imageURL: '../../assets/images/defaul_track.png',
    },
    duration: '',
  };
}

export function newAlbum(): IAlbum {
  return {
    id: '',
    title: '',
    href: '',
    imageURL: '',
  };
}
