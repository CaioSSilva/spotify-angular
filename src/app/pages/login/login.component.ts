import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.validateToken();
  }

  validateToken() {
    const token = this.spotifyService.getToken();
    if (token) {
      this.spotifyService.setToken(token);
      this.router.navigate(['player/home']);
    }
  }

  Login(){
    window.location.href = this.spotifyService.getLoginURL();
  }
}
