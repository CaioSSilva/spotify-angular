import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./pages/player/player.module').then((m) => m.PlayerModule),
    canMatch: [authenticatedGuard],
  },
];
