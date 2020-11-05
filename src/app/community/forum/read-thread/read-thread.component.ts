import { Thread } from '../../../shared/model/forum/thread.model';
import { ForumService } from '../../../shared/service/forum.service';
import { BreadcrumbService } from '../../../shared/service/util/breadcrumb/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
declare const moment: any;

@Component({
  selector: 'app-read-thread',
  templateUrl: './read-thread.component.html',
  styleUrls: ['./read-thread.component.scss']
})
export class ReadThreadComponent implements OnInit {
  isLoading: boolean;
  thread: Thread;

  constructor(
    private forumService: ForumService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.pipe(
      switchMap((params: Params) => this.forumService.getThreadByIdObservable(+params['id']))
    ).subscribe((thread: Thread) => {
      this.thread = thread;
      this.breadcrumbService.addSegment({ title: thread.title });
      this.isLoading = false;
    });
  }

  formatDate(date: string) {
    return moment(date, 'YYYYMMDD hh:mm:ss').fromNow();
  }

}
