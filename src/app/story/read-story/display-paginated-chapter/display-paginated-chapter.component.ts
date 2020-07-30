import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-paginated-chapter',
  templateUrl: './display-paginated-chapter.component.html',
  styleUrls: ['./display-paginated-chapter.component.scss']
})
export class DisplayPaginatedChapterComponent implements OnInit {
  @Input() chapters: Chapter[];
  @Input() selectedChapter: Chapter;

  constructor() { }

  ngOnInit() {
  }

  goToChapter(chapterSelectedByPagination: number) {
    this.selectedChapter = this.chapters[chapterSelectedByPagination - 1];
  }
}
