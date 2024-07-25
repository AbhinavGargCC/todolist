import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    title: 'Tasks',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'analytics',
    title: 'Analytics',
    canActivate: [authGuard],
    component: AnalyticsComponent,
  },
  {
    path: 'profile',
    title: 'User Profile',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  {
    path: '**',
    title: 'Page not found',
    canActivate: [authGuard],
    component: PageNotFoundComponent,
  },
];
