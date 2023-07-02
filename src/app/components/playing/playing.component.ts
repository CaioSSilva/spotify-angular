import { Subscription } from 'rxjs';
import { IMusic } from './../../models/IMusic';
import { Component } from '@angular/core';
import { newMusic } from 'src/app/Common/Mocks';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss'],
})
export class PlayingComponent {
  actualMusic: IMusic = newMusic();
  subs: Subscription[] = [];
  isPlaying: boolean = true;
  timerId: any = null;
  previousIcon = faBackward;
  nextIcon = faForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  constructor(private play: PlayerService, private spotify: SpotifyService) {
    this.getPlayingNow();
  }

  getPlayingNow() {
    const sub = this.play.actualMusic.subscribe((music) => {
      this.actualMusic = music;

    });

    this.subs.push(sub);
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async previousMusic() {
    await this.spotify.previousMusic();
  }

  async nextMusic() {
    await this.spotify.nextMusic();
  }

  async playingMusic() {
    await this.spotify.musicToggle();
    this.getMusicState()
  }
  async getMusicState() {
    this.isPlaying = !await this.spotify.getActualMusicState();
  }
}
