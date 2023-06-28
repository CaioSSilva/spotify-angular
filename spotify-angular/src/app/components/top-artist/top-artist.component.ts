import { Component } from '@angular/core';
import { newArtist } from 'src/app/Common/Mocks';
import { IArtist } from 'src/app/models/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent {
  topArtist: IArtist = newArtist();


  constructor(private spotify: SpotifyService) {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.spotify.getTopArtists(1);

    if (artists) {
      this.topArtist = <IArtist>artists.pop();

    }
  }
}
