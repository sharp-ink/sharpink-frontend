// import { CkeditorConfigUtil, EditorType } from '../../../../shared/service/util/ckeditor-config-util.service';
import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.component.html',
  styleUrls: ['./step-summary.component.scss']
})
export class StepSummaryComponent implements OnInit {
  stepSummaryForm: FormGroup;
  //ckEditor = CustomEditor;
  //ckEditorConfig: any;

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    //this.initCkEditor();
  }

  private initForm() {
    const createStory = this.createStoryService.story;
    this.stepSummaryForm = new FormGroup({
      'storySummary': new FormControl(createStory.summary ? createStory.summary : '', [ Validators.maxLength(2000) ])
    });
  }

  /*private initCkEditor() {
    this.ckEditorConfig = CkeditorConfigUtil.getCkeditorConfig(EditorType.SUMMARY);
  }*/

  onNextStep() {
    this.createStoryService.completeStoryStepSummary(this.stepSummaryForm);
    this.router.navigate(['../etape-4'], { relativeTo: this.route });
  }

  onFinish() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepSummaryForm);
    this.router.navigate(['../../accueil'], { relativeTo: this.route });
  }
}
