import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.component.html',
  styleUrls: ['./step-summary.component.scss']
})
export class StepSummaryComponent implements OnInit {
  stepSummaryForm: FormGroup;
  ckEditor = ClassicEditor;
  ckEditorConfig: any;

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.initCkEditor();
  }

  private initForm() {
    this.stepSummaryForm = new FormGroup({
      'storySummary': new FormControl(null, [Validators.maxLength(2000)])
    });
  }

  private initCkEditor() {
    this.ckEditorConfig = {
      placeholder: 'Écrire un résumé...',
      language: 'fr',
      toolbar: ['bold', 'italic', '|', 'undo', 'redo']
    };
  }

  onNextStep() {
    this.createStoryService.completeStoryStepSummary(this.stepSummaryForm);
    this.router.navigate(['../etape-4'], { relativeTo: this.route });
  }

  onFinish() {
    this.createStoryService.completeStoryStepMiscInfo(this.stepSummaryForm);
    // TODO : rediriger vers la bonne page
  }
}
