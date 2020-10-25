import { BreadcrumbSegment } from './breadcrumb-segment.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  // url should be set set for all segments except the last one (which is the current page)
  @Input() breadcrumbSegments: BreadcrumbSegment[];

  constructor() { }

  ngOnInit(): void {
  }

}
