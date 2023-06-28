import { Component } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { newUser } from 'src/app/Common/Mocks';
import { IUser } from 'src/app/models/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-left-footer',
  templateUrl: './left-footer.component.html',
  styleUrls: ['./left-footer.component.scss'],
})
export class LeftFooterComponent {
  exitIcon = faSignOut;

  user: IUser = newUser();

  constructor(private spotify: SpotifyService) {
    this.getUser()
  }
  
  async getUser() {
    this.user = await this.spotify.getUser();
  }

  logOut() {
    this.spotify.logOut();
  }
}
