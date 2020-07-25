import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS = 'white';
  private readonly THEME_BLUE_PRIMARY_COLOR       = '#0045C0';
  private readonly THEME_MARINE_PRIMARY_COLOR      = '#00304F';
  private readonly THEME_FANCY_PRIMARY_COLOR      = '#F81FAA';
  private readonly THEME_BRICK_PRIMARY_COLOR      = '#B22222';
  private readonly THEME_GREY_PRIMARY_COLOR       = '#303030';
  private readonly THEME_PUMPKIN_PRIMARY_COLOR    = '#FF8C00';
  private readonly THEME_DARLING_PRIMARY_COLOR    = '#00CED1';
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
      name: 'Brick',
      themePrimaryColor: this.THEME_BRICK_PRIMARY_COLOR,
      themeSecondaryColor: '#A04030',
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.THEME_BRICK_PRIMARY_COLOR
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
      name: 'Pumkin',
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
    }
  ];

  currentThemeId: number;

  constructor() { }

  // called when root component is initialized
  initTheme(initialThemeId: number): void {
    this.loadTheme(initialThemeId);
    this.currentThemeId = initialThemeId;
  }

  loadTheme(newThemeId: number) {
    const themeWrapper = document.querySelector('body');
    const theme = this.getThemeById(newThemeId);
    themeWrapper.style.setProperty('--theme-primary-color', theme.themePrimaryColor);
    themeWrapper.style.setProperty('--header-foreground-color', theme.headerForegroundColor);
    themeWrapper.style.setProperty('--button-primary-background-color', theme.buttonPrimaryBackgroundColor);
    themeWrapper.style.setProperty('--theme-secondary-color', theme.themeSecondaryColor);
    this.currentThemeId = newThemeId;
  }

  private getThemeById(themeId: number) {
    return this.THEMES.find(theme => theme.id === themeId) || this.THEMES[0];
  }

  getAllThemes() {
    return this.THEMES;
  }
}
