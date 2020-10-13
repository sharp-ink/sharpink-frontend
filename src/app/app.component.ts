import { AuthService } from './shared/service/auth.service';
import { ThemeService } from './shared/service/theme.service';
import { Component, OnInit } from '@angular/core';
declare const moment: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.initLocaleConfig();
    this.initUserFromCookiesIfPresent();
    this.initTheme();
  }

  private initLocaleConfig() {
    moment.locale('fr'); // set the locale for MomentJS dates
  }

  private initUserFromCookiesIfPresent() {
    this.authService.connectedUser = this.authService.getConnectedUserFromCookies();
    this.authService.connectedUserPreferences = this.authService.getConnectedUserPreferencesFromCookies();
  }

  private initTheme() {
    const userTheme = this.authService.connectedUserPreferences?.theme;
    this.themeService.loadTheme(userTheme ? userTheme : this.themeService.DEFAULT_THEME_ID);
  }

}
