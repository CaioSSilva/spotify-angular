import { Component } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faMusic,
  faHeart as liked
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as notLiked } from '@fortawesome/free-regular-svg-icons';
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
  homeIcon  = faHome;
  likedIcon = liked;
  notLikedIcon  = notLiked;
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

    clearTimeout(this.timerId);

    this.musics = await this.spotify.getLikedSongs(this.offset, this.limit);
    this.tracksNumber = await this.spotify.getLikedSongsTotal();
    this.tracksNumberConvert = Math.floor(this.tracksNumber / 50);

    this.timerId = setInterval(async () => {
      await this.getLikedSongs();
    }, 5000);
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
  async dislike(music : IMusic){
    await this.spotify.dislike(music)
  }
}
