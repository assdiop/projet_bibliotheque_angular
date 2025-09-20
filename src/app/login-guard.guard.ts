import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifie si token existe ET n'est pas expiré
  if (authService.getToken() && !authService.isTokenExpired()) {
      // déjà connecté redirection vers home
      router.navigate(['/']);
      return false; // empêche d’accéder à /login
    }else{
      return true; // pas connecté → accès autorisé au login
    }

};
