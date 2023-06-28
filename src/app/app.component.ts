import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spotify-angular';
}
export const SpotifyConfigs = {
  clientId: 'e3d2c7e6cf56421cbe3ecc20998fc874',
  endpointAuth: 'https://accounts.spotify.com/authorize',
  redirectURI: 'http://localhost:4200/login/',
  scopes: [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
