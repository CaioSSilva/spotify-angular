import { Injectable } from "@angular/core";
import Spotify from "spotify-web-api-js";
import { IUser } from "../models/IUser";
import {
  SpotifyAmbumToModel,
  SpotifyArtistToModel,
  SpotifyMusicToModel,
  SpotifyPlaylistToModel,
  SpotifyUserToModel,
} from "../Common/spotifyHelper";
import { IPlaylist } from "../models/IPlaylist";
import { SpotifyConfigs } from "../app.component";
import { IArtist } from "../models/IArtist";
import { IMusic } from "../models/IMusic";
import { IAlbum } from "../models/IAlbum";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs;
  user: IUser | undefined;
  timerId: any = null;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if (this.user) return true;

    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      this.setToken(token);
      await this.getUser();
      return this.user;
    } catch (ex) {
      return false;
    }
  }

  async getUser(): Promise<IUser> {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToModel(userInfo);
    return this.user;
  }

  getLoginURL() {
    const authEndpoint = `${SpotifyConfigs.endpointAuth}?`;
    const clientId = `client_id=${SpotifyConfigs.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfigs.redirectURI}&`;
    const scopes = `scope=${SpotifyConfigs.scopes.join("%20")}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getToken() {
    if (!window.location.hash) return "";

    const params = window.location.hash.substring(1).split("&");
    return params[0].split("=")[1];
  }

  setToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem("token", token);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user?.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistToModel);
  }

  async getTopArtists(limit: number): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToModel);
  }

  async getTopArtistAlbuns(id: string, limit: number): Promise<IAlbum[]> {
    const albuns = await this.spotifyApi.getArtistAlbums(id, { limit });
    return albuns.items.map(SpotifyAmbumToModel);
  }

  async getLikedSongs(offset: number, limit: number): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map((m) => SpotifyMusicToModel(m.track));
  }
  async getLikedSongsTotal() {
    const musicsTotal = await this.spotifyApi.getMySavedTracks();
    return musicsTotal.total;
  }

  async getActualMusic(): Promise<IMusic> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicToModel(<SpotifyApi.TrackObjectFull>musicSpotify.item);
  }
  async getActualMusicState(): Promise<boolean> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return musicSpotify.is_playing;
  }
  async previousMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  async pauseMusic() {
    await this.spotifyApi.pause();
  }
  async playMusic(uri: string) {
    try {
      await this.spotifyApi.queue(uri);
      await this.spotifyApi.skipToNext();
    } catch (_) {
      this.logOut();
    }
  }
  async musicToggle() {
    if (await this.getActualMusicState()) {
      this.pauseMusic();
    } else {
      this.spotifyApi.play();
    }
  }

  async shuffleToggle(state: boolean) {
    await this.spotifyApi.setShuffle(state);
  }

  async repeatToggle(state: string) {
    await this.spotifyApi.setRepeat(<SpotifyApi.PlaybackRepeatState>state);
  }
  async setVolume(percent: number) {
    await this.spotifyApi.setVolume(percent);
  }
  logOut() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
