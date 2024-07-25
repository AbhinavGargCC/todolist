import { Component, inject } from '@angular/core';
import { LogoutService } from '../../service/logout/logout.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  serveLogOut = inject(LogoutService);

  profileDetails: {
    name: string;
    email: string;
    imageUrl: string;
  } = {
    name: '',
    email: '',
    imageUrl: '',
  };

  ngOnInit() {
    const { name, email, picture } = JSON.parse(
      sessionStorage.getItem('logginUserDetails') ?? '{"jti":""}'
    );
    this.profileDetails.name = name;
    this.profileDetails.email = email;
    this.profileDetails.imageUrl = picture;
  }

  signout() {
    this.serveLogOut.onSignout();
  }
}
