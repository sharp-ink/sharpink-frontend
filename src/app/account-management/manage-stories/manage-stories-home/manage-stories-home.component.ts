import { ManageStoriesHomeService } from './manage-stories-home.service';
import { Story } from '../../../shared/model/story/story.model';
import { AuthService } from '../../../shared/service/auth.service';
import { MemberService } from '../../../shared/service/member.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-stories-home',
  templateUrl: './manage-stories-home.component.html',
  styleUrls: ['./manage-stories-home.component.scss']
})
export class ManageStoriesHomeComponent implements OnInit {
  isLoading: boolean;
  @Input() memberId: number;
  myStories: Story[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private authService: AuthService,
    private manageStoriesHomeService: ManageStoriesHomeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    const authorId = this.authService.getConnectedUser().id; // can not be null since the member is logged
    this.memberService.loadStoriesOfAuthor(authorId).subscribe(
      (stories: Story[]) => {
        this.myStories = stories;
        this.isLoading = false;
      });
  }

  goToCreation() {
    this.router.navigate(['../creer'], { relativeTo: this.route });
  }

  updateStoryStatus(story: Story) {
    this.manageStoriesHomeService.changeStoryStatus(story).subscribe(updatedStory => {
      console.log(updatedStory);
      story.published = updatedStory.published; // reflect the new status on the page
      this.notificationService.success(
        `L'histoire est désormais <b>${story.published ? 'visible publiquement' : 'masquée'}</b>.`
      );

    });
  }

  removeStory(story: Story) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l\'histoire [${story.title}] ? ATTENTION, CETTE OPÉRATION EST IRRÉVERSIBLE !`)) {
      this.myStories = this.myStories.filter(s => s.id !== story.id);
      this.manageStoriesHomeService.removeStory(story.id).subscribe(response => {
        console.log(response);
        this.notificationService.warning(`L'histoire <b><u>${story.title}</u></b> a bien été supprimée.`);
      });
    }
  }
}
