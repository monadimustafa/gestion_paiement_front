import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { authenticatedUser: user } = authService;
  const { roles: requiredRoles } = route.data
  const isAuthorized = user.roles.some((role: string) => requiredRoles.includes(role))
  
  if(!authService.isAuthenticated){
    router.navigate(['/login']);
    return false;
  }
  
  return isAuthorized;
};
