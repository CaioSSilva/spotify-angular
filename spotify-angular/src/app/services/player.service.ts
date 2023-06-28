import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { IMusic } from '../models/IMusic';
import { newMusic } from '../Common/Mocks';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  actualMusic = new BehaviorSubject<IMusic>(newMusic());

  timerId: any = null;
  is_playing: boolean = true;

  constructor(private spotify: SpotifyService) {
    this.getActualMusic();
  }

  async getActualMusic() {
    clearTimeout(this.timerId);

    // Pick Music
    const music = await this.spotify.getActualMusic();
    this.setActualMusic(<IMusic>(<unknown>music));

    // Case loop
    this.timerId = setInterval(async () => {
      await this.getActualMusic();
    }, 1000);
  }
  async getActualMusicStatus() {
    this.is_playing = await this.spotify.getActualMusicState();
    return this.is_playing
  }

  setActualMusic(music: IMusic) {
    this.actualMusic.next(music);
  }

  async previousMusic() {
    await this.spotify.previousMusic();
  }

  async nextMusic() {
    await this.spotify.nextMusic();
  }
}
