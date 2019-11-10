import { AuthService } from '../../shared/service/auth.service';
import { ThemeService } from '../../shared/service/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  readonly availableThemes: any;
  readonly currentUserThemeId: number;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.availableThemes = themeService.getAllThemes();
    this.currentUserThemeId = themeService.currentThemeId;
  }
  ngOnInit() { }

  changeTheme(themeId: number) {
    this.themeService.loadTheme(themeId);
  }
}
