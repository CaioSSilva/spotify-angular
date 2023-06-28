import { playerRoutes } from './player.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeftFooterComponent } from 'src/app/components/left-footer/left-footer.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { HomeComponent } from '../home/home.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { PlayingComponent } from 'src/app/components/playing/playing.component';
import { TopTracksComponent } from 'src/app/components/top-tracks/top-tracks.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    LeftFooterComponent,
    RightPanelComponent,
    TopArtistComponent,
    HomeComponent,
    SearchComponent,
    PlayingComponent,
    TopTracksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playerRoutes),
    FontAwesomeModule,
  ],
})
export class PlayerModule {}
