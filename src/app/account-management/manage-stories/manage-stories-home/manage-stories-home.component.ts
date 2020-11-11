import { ManageStoriesHomeService } from './manage-stories-home.service';
import { StoriesDisplayMode } from './stories-list-display-mode.enum';
import { Story } from '../../../shared/model/story/story.model';
import { AuthService } from '../../../shared/service/auth.service';
import { UserService } from '../../../shared/service/user.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-stories-home',
  templateUrl: './manage-stories-home.component.html',
  styleUrls: ['./manage-stories-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageStoriesHomeComponent implements OnInit {
  isLoading: boolean;
  myStories: Story[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memberService: UserService,
    private authService: AuthService,
    private manageStoriesHomeService: ManageStoriesHomeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    const authorId = this.authService.connectedUser.id; // can not be null since the member is logged
    this.memberService.loadStoriesOfAuthor(authorId).subscribe(
      (stories: Story[]) => {
        this.myStories = stories;
        this.isLoading = false;
      });
  }

  goToCreation() {
    this.router.navigate(['../creer'], { relativeTo: this.route });
  }

  goToEdition(storyId: number) {
    this.router.navigate(['..', storyId], { relativeTo: this.route });
  }

  updateStoryStatus(story: Story, event: Event) {
    this.manageStoriesHomeService.changeStoryStatus(story).subscribe(updatedStory => {
      console.log(updatedStory);
      story.published = updatedStory.published; // reflect the new status on the page
      this.notificationService.success(
        `L'histoire est désormais <b>${story.published ? 'visible publiquement' : 'masquée'}</b>.`
      );

    });
  }

  removeStory(story: Story, event: Event) {
    event.stopPropagation();
    if (confirm(`Êtes-vous sûr de vouloir supprimer l\'histoire [${story.title}] ? ATTENTION, CETTE OPÉRATION EST IRRÉVERSIBLE !`)) {
      this.myStories = this.myStories.filter(s => s.id !== story.id);
      this.manageStoriesHomeService.removeStory(story.id).subscribe(response => {
        console.log(response);
        this.notificationService.warning(`L'histoire <b><u>${story.title}</u></b> a bien été supprimée.`);
      });
    }
  }
}
