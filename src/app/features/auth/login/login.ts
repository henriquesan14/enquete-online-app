import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [NzInputModule, NzButtonModule, NzCardModule, NzIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loading = false;

  loginWithFacebook() {
    const clientId = `${environment.facebookClientId}`;
    const redirectUri = encodeURIComponent(`${environment.facebookRedirectUri}`);
    const scope = encodeURIComponent('email,public_profile');

    const url = `https://www.facebook.com/v19.0/dialog/oauth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&auth_type=rerequest`;

    window.location.href = url;
  }

  loginWithGoogle() {
    const clientId = `${environment.googleClientId}`;
    const redirectUri = encodeURIComponent(`${environment.googleRedirectUri}`);
    const scope = encodeURIComponent('openid email profile');

    const url = `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = url;
  }
}
