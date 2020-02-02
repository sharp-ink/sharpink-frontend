import { ApiErrorCodeEnum } from '../../../../shared/model/error/api-error-code-enum.model';
import { ApiError } from '../../../../shared/model/error/api-error.model';
import { CreateStoryService } from '../create-story.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step-title',
  templateUrl: './step-title.component.html',
  styleUrls: ['./step-title.component.scss']
})
export class StepTitleComponent implements OnInit {
  stepTitleForm: FormGroup;
  storyId: number; // si la création a réussi, contient l'id de l'histoire nouvellement créée
  creationError: ApiError;
  backendOperationInProgress: boolean;

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initCreateStory();
    this.initForm();
    this.backendOperationInProgress = false;
  }

  initCreateStory() {
    if (!this.createStoryService.createStory) {
      this.createStoryService.createStory = {};
    }
  }

  initForm() {
    // si une histoire était déjà en cours de création on reprend ses infos (par exemple si on revient de l'étape 2)
    const createStory = this.createStoryService.createStory;
    this.stepTitleForm = new FormGroup({
      'storyTitle': new FormControl(createStory.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]
      ),
      'storyIsOriginal': new FormControl(createStory.isOriginal === false ? 'FANFIC' : 'ORIGINAL', Validators.required)
    });
  }

  onNextStep(): void {
    this.backendOperationInProgress = true;
    this.createStoryService.initStoryStepTitle(this.stepTitleForm).subscribe(
      (storyId: number) => {
        this.creationError = null;
        this.storyId = storyId;
        this.createStoryService.storyId = storyId;
        this.router.navigate(['../etape-2'], { relativeTo: this.route });
        this.backendOperationInProgress = false;
      },
      (error: ApiError) => {
        console.log(error);
        this.creationError = error;
        if (error.code === ApiErrorCodeEnum.TITLE_ALREADY_USED) {
          this.creationError.message =
            `Une histoire existe déjà avec ce titre : '${this.stepTitleForm.value.storyTitle}'. Veuillez réessayer avec un autre titre.`;
        }
        this.backendOperationInProgress = false;
      }
    );
  }

  onFinish(): void {
    this.createStoryService.initStoryStepTitle(this.stepTitleForm);
    // TODO : rediriger vers la bonne page
  }

}
