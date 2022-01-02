import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ThemeService } from '../shared/service/theme.service';


@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  connectedUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.connectedUser = this.authService.getConnectedUserFromLocalStorage();
    this.authService.connectedUserSubject.subscribe((connectedUser: User) => {
      this.connectedUser = connectedUser;
    });
  }

  login() {
    this.router.navigate(['/connexion']);
  }

  logout() {
    this.authService.clearConnectedUser();
    this.themeService.loadTheme(this.themeService.DEFAULT_THEME_ID); // re-apply default theme
  }

}
