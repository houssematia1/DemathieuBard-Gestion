import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Guard qui protège les routes nécessitant une authentification.
 * Redirige vers /auth/login si non connecté.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.isAuthenticated()) return true;

  router.navigate(['/auth/login']);
  return false;
};
