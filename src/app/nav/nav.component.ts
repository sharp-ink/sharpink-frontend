import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  shortcuts: ShortcutInput[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: 'alt + a',
        label: 'Menu principal',
        description: 'Accueil',
        command: (e) => this.router.navigate(['/accueil'])
      },
      {
        key: 'alt + l',
        label: 'Menu principal',
        description: 'Lecture',
        command: (e) => this.router.navigate(['/histoires'])
      },
      {
        key: 'alt + p',
        label: 'Menu principal',
        description: 'Mon compte',
        command: (e) => this.router.navigate(['/mon-compte'])
      },
      {
        key: 'alt + c',
        label: 'Menu principal',
        description: 'Communuté',
        command: (e) => this.router.navigate(['/communaute'])
      },
      {
        key: 's o s',
        label: 'Menu principal',
        description: 'Support',
        command: (e) => this.router.navigate(['/contact'])
      }
    );
  }
}
