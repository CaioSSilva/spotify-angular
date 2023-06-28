import { Component } from '@angular/core';
import { newAlbum, newArtist } from 'src/app/Common/Mocks';
import { IAlbum } from 'src/app/models/IAlbum';
import { IArtist } from 'src/app/models/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.scss'],
})
export class TopTracksComponent {
  topArtist: IArtist = newArtist();
  artistAlbuns: IAlbum[] = [];

  constructor(private spotify: SpotifyService) {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.spotify.getTopArtists(1);

    if (artists) {
      this.topArtist = <IArtist>artists.pop();
    }
    this.getArtistAlbuns(this.topArtist.id, 4);
  }

  async getArtistAlbuns(id: string, limit: number) {
    this.artistAlbuns = await this.spotify.getTopArtistAlbuns(id, limit);
  }
}
