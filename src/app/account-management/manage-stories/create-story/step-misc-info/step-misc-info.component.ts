import { StoryTypeEnum } from '../../../../shared/constant/story-type.enum';
import { CreateStory } from '../../../../shared/model/story/create-story.model';
import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step-misc-info',
  templateUrl: './step-misc-info.component.html',
  styleUrls: ['./step-misc-info.component.scss']
})
export class StepMiscInfoComponent implements OnInit {
  createStory: CreateStory;
  stepMiscInfoForm: FormGroup;
  types = new Array<{ name: string, label: string }>();

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createStory = this.createStoryService.createStory;
    this.initForm();
    this.initTypes();
  }

  initForm() {
    this.stepMiscInfoForm = new FormGroup({
      'storyType': new FormControl(null, [])
    });
  }

  initTypes() {
    Object.keys(StoryTypeEnum).forEach(type => this.types.push({ name: type, label: StoryTypeEnum[type] }));
  }

  onNextStep() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepMiscInfoForm);
    this.router.navigate(['../etape-3'], { relativeTo: this.route });
  }

  onFinish() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepMiscInfoForm);
    // TODO : rediriger vers la bonne page
  }
}
