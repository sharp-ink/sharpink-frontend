
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Story } from 'src/app/shared/model/story.model';
import { StoryService } from 'src/app/shared/service/story.service';

@Component({
  selector: 'app-list-stories',
  templateUrl: './list-stories.component.html',
  styleUrls: ['./list-stories.component.css'],
})
export class ListStoriesComponent implements OnInit, OnDestroy {

  allStories: Story[] = [];
  allStoriesSubscription: Subscription;

  constructor(
    private storyService: StoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allStoriesSubscription = this.storyService.allStoriesSubject.subscribe(
      (stories: Story[]) => {
        this.allStories = stories;
      }
    );
    this.loadAllStories();
  }

  loadAllStories() {
    this.storyService.loadAllStories();
  }

  /**
   * Affiche un apercu de l'histoire
   */
  showPreview(story: Story) {
    this.router.navigate(['/histoires/liste', story.id, 'apercu']);
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
