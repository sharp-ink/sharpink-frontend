import { PreviewStoryComponent } from './preview-story/preview-story.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/shared/model/story/story.model';
import { StoryService } from 'src/app/shared/service/story.service';

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
        this.isLoading = false;
      }
    );
    this.loadAllStories();
  }

  loadAllStories() {
    this.storyService.loadAllStories();
  }

  /**
   * Displays a preview of the story
   */
  showPreview(story: Story) {
    const modalOptions = {
      backdrop: false,
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        story: story
      }
    };
    this.bsModalRef = this.bsModalService.show(PreviewStoryComponent, modalOptions);
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
