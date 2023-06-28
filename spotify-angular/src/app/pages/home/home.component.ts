import { Component } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { IMusic } from 'src/app/models/IMusic';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';
import { newMusic } from 'src/app/Common/Mocks';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  musics: IMusic[] = [];

  tracksNumber: number = 0;

  tracksNumberConvert: number = 0;

  offset: number = 0;

  limit: number = 50;

  actualMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  timerId: any = null;

  arrowLeftIcon = faArrowLeft;
  arrowRightIcon = faArrowRight;
  musicIcon = faMusic;
  homeIcon  = faHome
  constructor(private spotify: SpotifyService, private play: PlayerService) {
    this.getLikedSongs();
    this.getActualMusic();
  }

  getArtists(musics: IMusic) {
    return musics.artists.map((artist) => artist.name).join(', ');
  }

  getActualMusic() {
    const sub = this.play.actualMusic.subscribe((music) => {
      this.actualMusic = music;
    });

    this.subs.push(sub);
  }

  async getLikedSongs() {
    this.musics = await this.spotify.getLikedSongs(this.offset, this.limit);
    this.tracksNumber = await this.spotify.getLikedSongsTotal();
    this.tracksNumberConvert = Math.floor(this.tracksNumber / 50);
  }

  nextPage() {
    if (
      this.tracksNumber - this.offset > 0 &&
      this.tracksNumber - this.offset > this.limit
    ) {
      this.offset = this.offset + 50;
      this.getLikedSongs();
    }
  }

  previousPage() {
    if (this.offset != 0) {
      this.offset = this.offset - 50;
      this.getLikedSongs();
    }
  }
  backHome(){
    this.offset = 0
    this.getLikedSongs()
  }
  async playMusic(music: IMusic) {
    await this.spotify.playMusic(music.uri);
    this.play.setActualMusic(music);
  }
}
