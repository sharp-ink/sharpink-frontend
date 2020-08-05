import { ThemeService } from './shared/service/theme.service';
import { Component, OnInit } from '@angular/core';
declare const moment: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    // theme
    const initialThemeId = 3; // all available themes in ThemeService
    this.themeService.initTheme(initialThemeId);

    moment.locale('fr'); // set the locale for MomentJS dates
  }

}
