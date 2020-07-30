import { StoryTypeEnum } from '../../../../shared/constant/story-type.enum';
import { StoryPatchRequest } from '../../../../shared/model/story/story-patch-request.model';
import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step-misc-info',
  templateUrl: './step-misc-info.component.html',
  styleUrls: ['./step-misc-info.component.scss']
})
export class StepMiscInfoComponent implements OnInit {
  createStory: StoryPatchRequest;
  stepMiscInfoForm: FormGroup;
  types = new Array<{ name: string, label: string }>();

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createStory = this.createStoryService.createStory;
    this.initForm();
    this.types = StoryTypeEnum.getTypesForDropdown();
  }

  initForm() {
    this.stepMiscInfoForm = new FormGroup({
      'storyType': new FormControl('')
    });
  }

  onNextStep() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepMiscInfoForm);
    this.router.navigate(['../etape-3'], { relativeTo: this.route });
  }

  onFinish() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepMiscInfoForm);
    this.router.navigate(['../../accueil'], { relativeTo: this.route });
  }
}
