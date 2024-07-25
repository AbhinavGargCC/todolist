declare const google: any;

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  ngOnInit() {
    google.accounts.id.initialize({
      client_id:
        '219013415941-jenp8om5vm8eht6sokvcn206aueoaemb.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled-blue',
      size: 'large',
      shape: 'rectangle',
      width: 120,
    });
  }

  getCredential(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      // take credential
      const credentials = this.getCredential(response.credential);
      // save credentials in session
      sessionStorage.setItem('logginUserDetails', JSON.stringify(credentials));
      // navigate to home page
      this.router.navigate(['']);
    }
  }
}
