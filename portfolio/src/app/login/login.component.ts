import { Component } from '@angular/core';
import { AuthService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dash-board']);
      },
      (err) => {
        console.error('Login failed', err);
      }
    );
  }
}
