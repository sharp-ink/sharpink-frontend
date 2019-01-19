import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly HEADER_H1       = 'SharpInk';
  readonly HEADER_H2       = 'Site communautaire d\'écriture et lecture amateur';

  constructor() { }

  ngOnInit() {
  }

}
