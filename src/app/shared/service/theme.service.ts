import { AuthService } from './auth.service';
import { UserPreferences } from '../model/user/user-preferences.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS = 'white';
  private readonly THEME_BLUE_PRIMARY_COLOR = '#0045C0';
  private readonly THEME_MARINE_PRIMARY_COLOR = '#00304F';
  private readonly THEME_FANCY_PRIMARY_COLOR = '#F81FAA';
  private readonly THEME_SCARLET_PRIMARY_COLOR = '#B22222';
  private readonly THEME_GREY_PRIMARY_COLOR = '#303030';
  private readonly THEME_PUMPKIN_PRIMARY_COLOR = '#FF8C00';
  private readonly THEME_DARLING_PRIMARY_COLOR = '#00CED1';
  private readonly THEME_BARLEY_SUGAR_PRIMARY_COLOR = '#A000B0';
  private readonly THEMES = [
    {
      id: 0,
      name: 'Bleu',
      themePrimaryColor: this.THEME_BLUE_PRIMARY_COLOR,
      themeSecondaryColor: '#00BFFF',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_BLUE_PRIMARY_COLOR
    },
    {
      id: 1,
      name: 'Marine',
      themePrimaryColor: this.THEME_MARINE_PRIMARY_COLOR,
      themeSecondaryColor: '#16A085',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_MARINE_PRIMARY_COLOR
    },
    {
      id: 2,
      name: 'Candy',
      themePrimaryColor: this.THEME_FANCY_PRIMARY_COLOR,
      themeSecondaryColor: '#C71585',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_FANCY_PRIMARY_COLOR
    },
    {
      id: 3,
      name: 'Écarlate',
      themePrimaryColor: this.THEME_SCARLET_PRIMARY_COLOR,
      themeSecondaryColor: '#F03060',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_SCARLET_PRIMARY_COLOR
    },
    {
      id: 4,
      name: 'Gris',
      themePrimaryColor: this.THEME_GREY_PRIMARY_COLOR,
      themeSecondaryColor: 'black',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_GREY_PRIMARY_COLOR
    },
    {
      id: 5,
      name: 'Pumpkin',
      themePrimaryColor: this.THEME_PUMPKIN_PRIMARY_COLOR,
      themeSecondaryColor: '#228B22',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_PUMPKIN_PRIMARY_COLOR
    },
    {
      id: 6,
      name: 'Turquoise',
      themePrimaryColor: this.THEME_DARLING_PRIMARY_COLOR,
      themeSecondaryColor: '#0090D0',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_DARLING_PRIMARY_COLOR
    },
    {
      id: 7,
      name: 'Sucre d\'orge',
      themePrimaryColor: this.THEME_BARLEY_SUGAR_PRIMARY_COLOR,
      themeSecondaryColor: '#C71585',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_BARLEY_SUGAR_PRIMARY_COLOR
    }
  ];

  readonly DEFAULT_THEME_ID = 3;
  currentThemeId: number;

  constructor() { }

  loadTheme(newThemeId: number) {
    const body = document.querySelector('body');
    const theme = this.getThemeById(newThemeId);
    body.style.setProperty('--theme-primary-color', theme.themePrimaryColor);
    body.style.setProperty('--header-foreground-color', theme.headerForegroundColor);
    body.style.setProperty('--button-primary-background-color', theme.buttonPrimaryBackgroundColor);
    body.style.setProperty('--theme-secondary-color', theme.themeSecondaryColor);
    this.currentThemeId = newThemeId;
  }

  getAllThemes() {
    return this.THEMES;
  }

  private getThemeById(themeId: number) {
    return this.THEMES.find(theme => theme.id === themeId) || this.THEMES[this.DEFAULT_THEME_ID];
  }
}
