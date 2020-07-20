import { Chapter } from '../../../shared/model/chapter/chapter.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.component.html',
  styleUrls: ['./select-chapter.component.scss']
})
export class SelectChapterComponent implements OnInit {
  @Input() chapters: Chapter[];
  selectedChapter: Chapter;
  @Output() chapterChange = new EventEmitter<Chapter>();

  constructor() { }

  ngOnInit() {
    this.selectedChapter = this.chapters[0];
  }

  onChangeChapter(selectedChapter: Chapter) {
    this.selectedChapter = selectedChapter;
    this.chapterChange.emit(this.selectedChapter);
  }
}
