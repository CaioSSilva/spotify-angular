import { Component } from "@angular/core";
import {
  faRepeat,
  faShuffle,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-aux-bar",
  templateUrl: "./aux-bar.component.html",
  styleUrls: ["./aux-bar.component.scss"],
})
export class AuxBarComponent {
  shuffleIcon = faShuffle;
  repeatIcon = faRepeat;
  volumeHighIcon = faVolumeHigh;
  volumeLowIcon = faVolumeLow;
  volumeOffIcon = faVolumeXmark;

  shuffle: boolean = false;
  repeat: string = "off";
  volume: number = 100;
  muted: boolean = false;

  constructor(private spotify: SpotifyService) {
    this.spotify.setVolume(this.volume);
    this.setVolumeIcon();
    this.spotify.shuffleToggle(this.shuffle);
    this.spotify.repeatToggle(this.repeat);
  }

  setShuffleState() {
    this.shuffle = !this.shuffle;
    this.spotify.shuffleToggle(this.shuffle);
  }

  async setReapeatState() {
    if (this.repeat == "off") {
      this.repeat = "track";
    } else {
      this.repeat = "off";
    }
    await this.spotify.repeatToggle(this.repeat);
  }

  async setVolume(volume: any) {
    this.volume = volume.target.value;
    await this.spotify.setVolume(volume.target.value);
  }

  setVolumeIcon() {
    if (this.volume == 0) {
      return this.volumeOffIcon;
    }
    if (this.volume <= 40) {
      return this.volumeLowIcon;
    }
    return this.volumeHighIcon;
  }

  async muteVolume() {
    this.muted = !this.muted;
    if (this.muted) this.volume = 0;
    else this.volume = 100;
    await this.spotify.setVolume(this.volume);
  }
}
