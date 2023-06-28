import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHome,
  faHeart,
  faMicrophone,
  faMusic,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.searchPlaylist();
  }

  //Icons
  homeIcon = faHome;
  likedIcon = faHeart;
  playlistIcon = faMusic
  podcastIcon = faMicrophone;
  libraryIcon = faList

  selectedMenu: string = 'home';

  userPlaylists: IPlaylist[] = [];

  clickButton(btn: string) {
    this.selectedMenu = btn;
    this.router.navigateByUrl(`/player/${btn}`);
  }

  async searchPlaylist() {
    this.userPlaylists = await this.spotifyService.getUserPlaylists(0, 20);
  }
}
