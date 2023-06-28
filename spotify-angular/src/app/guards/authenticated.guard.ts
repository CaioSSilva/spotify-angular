import { SpotifyService } from './../services/spotify.service';
import { CanMatchFn } from '@angular/router';

export const authenticatedGuard: CanMatchFn = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return notAuthenticated();
  }
  return new Promise(async (response) => {
    const userInitialized = new SpotifyService().initializeUser();
    if (await userInitialized) response(true);
    else response(notAuthenticated());
  });

  function notAuthenticated() {
    localStorage.clear();
    window.location.href = '/login';
    return false;
  }
};
