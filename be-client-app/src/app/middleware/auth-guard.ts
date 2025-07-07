import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);

  const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_token');
  const user = userData ? JSON.parse(userData) : {};
  const url = state.url;

  if (user?.authToken && user?.expiresIn && !authService.isAuthTokenExpired(user.authToken)) {
    if (url.includes('login') || url.includes('signup')) {
      router.navigate(['']);
      return false;
    }
    return true;
  } else {
    if (!url.includes('login') && !url.includes('signup')) {
      if ((url.includes('') && url.includes('cart'))) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    }
    return true;
  }
};
