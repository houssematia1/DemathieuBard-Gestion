import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Guard qui vérifie que l'utilisateur possède le rôle requis.
 * Usage dans les routes : data: { roles: ['ADMIN', 'CHEF_PROJET'] }
 */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService  = inject(AuthService);
  const router       = inject(Router);
  const allowedRoles = route.data['roles'] as string[];

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (allowedRoles && !authService.hasRole(...allowedRoles)) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
