import { Component } from '@angular/core';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private route: Router) {}
  isLoginPage() {
    return this.route.url === '/login';
  }
}
