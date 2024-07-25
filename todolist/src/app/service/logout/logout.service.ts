declare const google: any;

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor() {}
  private router = inject(Router);

  onSignout() {
    this.router.navigate(['login']);
    sessionStorage.removeItem('logginUserDetails');
    google.accounts.id.disableAutoSelect();
  }
}

@Injectable({
  providedIn: 'root',
})
export class CheckIsAuthenticated {
  userJti = JSON.parse(
    sessionStorage.getItem('logginUserDetails') ?? '{"jti":""}'
  );

  isUserAuthenticated() {
    if (this.userJti.jti) {
      return true;
    } else {
      return false;
    }
  }
}
