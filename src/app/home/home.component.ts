import { Component, OnInit } from '@angular/core';
declare const Rellax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const rellax = Rellax('.rellax');
  }

}
