import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-thumbnail',
  templateUrl: './step-thumbnail.component.html',
  styleUrls: ['./step-thumbnail.component.scss']
})
export class StepThumbnailComponent implements OnInit {
  stepThumbnailForm: FormGroup;

  constructor(private createStoryService: CreateStoryService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.stepThumbnailForm = new FormGroup({
      'storyThumbnail': new FormControl('')
    });
  }

  onFileChange(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.stepThumbnailForm.patchValue({
        storyThumbnail: reader.result
      });
    };
  }

  onFinish() {
    this.createStoryService.completeStoryStepThumbnail(this.stepThumbnailForm);
  }
}
