import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // console.log('roles : ' + authService.isAdminGuard());

  if (authService.isAdminGuard())
    return true;
  else {
    router.navigate(['app-forbidden']);
    return false;
  }

};
