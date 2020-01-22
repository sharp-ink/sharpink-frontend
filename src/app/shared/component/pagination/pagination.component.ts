import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() centered: boolean;         // if the pagination block should be centered or not in the parent component (uses mx-auto margin)
  @Input() collection: Array<any>;    // the collection to be paginated
  @Input() itemsPerPage: number;      // max items to be displayed on a page
  @Input() previousLabel: string;     // text to be displayed for 'Previous' button
  @Input() nextLabel: string;         // text to be displayed for 'Next' button

  currentPage: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  pageChanged(event: any): void {
    this.pageChange.emit(event.page);
  }
}
