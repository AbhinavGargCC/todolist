import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userJti = JSON.parse(
    sessionStorage.getItem('logginUserDetails') ?? '{"jti":""}'
  );

  if (userJti.jti) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
