import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);
  const url = state.url;

  const isLoggedIn = authService.isSecuredLoggedIn();

  if (!isLoggedIn) {
    // If not logged in and already on login or signup, allow
    if (url.includes('login') || url.includes('signup')) {
      return true;
    }
    // Redirect unauthenticated users to login
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  } else {
    // If logged in but tries to access login/signup, redirect to home or dashboard
    if (url.includes('login') || url.includes('signup')) {
      return router.createUrlTree(['']);
    }
    // If logged in, allow all other routes
    return true;
  }
};
