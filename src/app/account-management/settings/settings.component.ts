import { SettingsService } from './settings.service';
import { UserPreferences } from '../../shared/model/user/user-preferences.model';
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
    private themeService: ThemeService,
    private settingsService: SettingsService
  ) {
    this.availableThemes = themeService.getAllThemes();
    this.currentUserThemeId = themeService.currentThemeId;
  }
  ngOnInit() { }

  changeTheme(themeId: number) {
    this.themeService.loadTheme(themeId);
    this.settingsService.savePreference({
      propertyPath: 'appearance.theme',
      value: themeId
    }).subscribe(
      (userPreferences: UserPreferences) => {
        this.authService.connectedUser.userPreferences.appearance.theme = themeId;
        this.authService.storeConnectedUser(this.authService.connectedUser);
      }
    );
  }
}
