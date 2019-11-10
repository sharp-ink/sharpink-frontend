import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS = 'white';
  private readonly COLOR_BLUE           = '#0045c0';
  private readonly COLOR_BLUE_NIGHT     = '#002735';
  private readonly COLOR_PINK_FANCY     = '#f81faa';
  private readonly COLOR_RED_DARK       = '#d11c1c';
  private readonly COLOR_GREY_DARK      = '#303030';
  private readonly COLOR_ORANGE         = '#f49026';
  private readonly COLOR_ANNA           = '#00CED1';
  private readonly THEMES = [
    {
      id: 0,
      name: 'Thème par défaut',
      headerBackgroundColor: this.COLOR_BLUE,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_BLUE
    },
    {
      id: 1,
      name: 'Bleu nuit',
      headerBackgroundColor: this.COLOR_BLUE_NIGHT,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_BLUE_NIGHT
    },
    {
      id: 2,
      name: 'Rose pimpant',
      headerBackgroundColor: this.COLOR_PINK_FANCY,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_PINK_FANCY
    },
    {
      id: 3,
      name: 'Rouge sombre',
      headerBackgroundColor: this.COLOR_RED_DARK,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_RED_DARK
    },
    {
      id: 4,
      name: 'Gris sombre',
      headerBackgroundColor: this.COLOR_GREY_DARK,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_GREY_DARK
    },
    {
      id: 5,
      name: 'Orange',
      headerBackgroundColor: this.COLOR_ORANGE,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_ORANGE
    },
    {
      id: 6,
      name: 'Anna',
      headerBackgroundColor: this.COLOR_ANNA,
      headerForegroundColor: this.DEFAULT_TEXT_COLOR_ON_COLORED_BACKGROUNDS,
      buttonPrimaryBackgroundColor: this.COLOR_ANNA
    }
  ];

  currentThemeId = 0;

  constructor() { }

  // called when root component is initialized
  initTheme(initialThemeId: number): void {
    this.loadTheme(initialThemeId);
    this.currentThemeId = initialThemeId;
  }

  loadTheme(newThemeId: number) {
    const themeWrapper = document.querySelector('body');
    const theme = this.getThemeById(newThemeId);
    themeWrapper.style.setProperty('--header-background-color', theme.headerBackgroundColor);
    themeWrapper.style.setProperty('--header-foreground-color', theme.headerForegroundColor);
    themeWrapper.style.setProperty('--button-primary-background-color', theme.buttonPrimaryBackgroundColor);
    this.currentThemeId = newThemeId;
  }

  private getThemeById(themeId: number) {
    return this.THEMES.find(theme => theme.id === themeId) || this.THEMES[0];
  }

  getAllThemes() {
    return this.THEMES;
  }
}
