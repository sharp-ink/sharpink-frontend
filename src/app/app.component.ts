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
    this.initUserFromLocalStorageIfPresent();
    this.initTheme();
  }

  private initLocaleConfig() {
    moment.locale('fr'); // set the locale for MomentJS dates
  }

  private initUserFromLocalStorageIfPresent() {
    this.authService.connectedUser = this.authService.getConnectedUserFromLocalStorage();
  }

  private initTheme() {
    const userTheme = this.authService.connectedUser?.userPreferences?.appearance?.theme;
    this.themeService.loadTheme(userTheme ?? this.themeService.DEFAULT_THEME_ID);
  }

}
