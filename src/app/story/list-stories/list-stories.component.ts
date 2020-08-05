import { PreviewStoryComponent } from './preview-story/preview-story.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/shared/model/story/story.model';
import { StoryService } from 'src/app/shared/service/story.service';
declare const moment: any;

@Component({
  selector: 'app-list-stories',
  templateUrl: './list-stories.component.html',
  styleUrls: ['./list-stories.component.scss'],
})
export class ListStoriesComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  allStories: Story[] = [];
  allStoriesSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(
    private storyService: StoryService,
    private router: Router,
    private bsModalService: BsModalService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.allStoriesSubscription = this.storyService.allStoriesSubject.subscribe(
      (stories: Story[]) => {
        this.allStories = stories;
        this.allStories.sort((s1: Story, s2: Story) => {
          return s1.lastModificationDate.localeCompare(s2.lastModificationDate) * -1;
        });
        this.isLoading = false;
      }
    );
    this.loadAllStories();
  }

  loadAllStories() {
    this.storyService.loadAllStories();
  }

  lastUpdateDate(story: Story): string {
    return moment(story.lastModificationDate, 'YYYYMMDD hh:mm:ss').fromNow();
  }

  replaceParagraphsWithDiv(summary: string) {
    return summary.replace(/<p>/gi, '<div>')
      .replace(/<\/p>/gi, '</div>');
  }

  /**
   * Displays a preview of the story
   */
  showPreview(story: Story) {
    this.bsModalRef = this.bsModalService.show(PreviewStoryComponent, {
      backdrop: false,
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        story: story
      }
    });
  }

  /**
   * Redirige vers la page de l'histoire
   */
  goToStory(storyId: number) {
    this.router.navigate(['/histoires/lire', storyId]);
  }

  ngOnDestroy() {
    this.allStoriesSubscription.unsubscribe();
  }
}
