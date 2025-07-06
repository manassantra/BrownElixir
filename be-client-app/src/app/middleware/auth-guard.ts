// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { Auth } from '../services/auth';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(Auth);

//   const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_token');
//   const user = userData ? JSON.parse(userData) : {};
//   const url = state.url;

//   if (user?.authToken && user?.expiresIn && !authService.isAuthTokenExpired(user.authToken)) {
//     if (url.includes('login') || url.includes('signup')) {
//       alert('Already logged in');
//       router.navigate(['/']);
//       return false;
//     }
//     return true;
//   } else {
//     if (!url.includes('login') && !url.includes('signup')) {
//       alert('Please log in first');
//       router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Notyf } from 'notyf';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);
  const notyf = new Notyf();

  const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_token');
  const user = userData ? JSON.parse(userData) : {};
  const url = state.url;

  if (user?.authToken && user?.expiresIn && !authService.isAuthTokenExpired(user.authToken)) {
    if (url.includes('login') || url.includes('signup')) {
      notyf.success('Already logged in');
      router.navigate(['/']);
      return false;
    }
    return true;
  } else {
    if (!url.includes('login') && !url.includes('signup')) {
      notyf.error('Please log in first');
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
};
