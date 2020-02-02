import { ManageStoriesHomeService } from './manage-stories-home.service';
import { Story } from '../../../shared/model/story/story.model';
import { AuthService } from '../../../shared/service/auth.service';
import { MemberService } from '../../../shared/service/member.service';
import { Component, Input, OnInit } from '@angular/core';

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
    private memberService: MemberService,
    private authService: AuthService,
    private manageStoriesHomeService: ManageStoriesHomeService
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

  updateStoryStatus(story: Story) {
    this.manageStoriesHomeService.changeStoryStatus(story).subscribe(updatedStory => {
      console.log(updatedStory);
      story.published = updatedStory.published; // reflect the new status on the page

    });
  }
}
