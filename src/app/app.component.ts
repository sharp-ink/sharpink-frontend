import { ThemeService } from './shared/service/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    const initialThemeId = 3; // all available themes in ThemeService
    this.themeService.initTheme(initialThemeId);
  }

}
