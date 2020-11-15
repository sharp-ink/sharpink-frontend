import { ForumService } from '../../community/forum/forum.service';
import { Chapter } from '../../shared/model/story/chapter/chapter.model';
import { Story } from '../../shared/model/story/story.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StoryService } from 'src/app/shared/service/story.service';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss'],
  providers: []
})
export class ReadStoryComponent implements OnInit {

  isLoading: boolean;
  story: Story = null;
  selectedChapter: Chapter;

  constructor(
    private storyService: StoryService,
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.storyService.getStoryById(+this.route.snapshot.params['id']).subscribe(
      (story: Story) => {
        this.story = story;
        this.selectedChapter = this.story.chapters[0];
        this.isLoading = false;
      }
    );
  }

  /**
   * Redirige vers le fil de discussion du forum pour cette histoire (en propose la création s'il n'existe pas)
   */
  goToStoryThread(story: Story) {
    this.forumService.goToStoryThread(story);
  }

}
