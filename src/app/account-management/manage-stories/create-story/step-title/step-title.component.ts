import { ApiErrorCodeEnum } from '../../../../shared/model/error/api-error-code-enum.model';
import { ApiError } from '../../../../shared/model/error/api-error.model';
import { CreateStoryService } from '../create-story.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step-title',
  templateUrl: './step-title.component.html',
  styleUrls: ['./step-title.component.scss']
})
export class StepTitleComponent implements OnInit {
  stepTitleForm: FormGroup;
  storyId: number; // si la création a réussi, contient l'id de l'histoire nouvellement créée
  backendOperationInProgress: boolean;

  constructor(
    private createStoryService: CreateStoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
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
        this.storyId = storyId;
        this.createStoryService.storyId = storyId;
        this.router.navigate(['../etape-2'], { relativeTo: this.route });
        this.backendOperationInProgress = false;
      },
      (error: ApiError) => {
        console.log(error);
        if (error.code === ApiErrorCodeEnum.TITLE_ALREADY_USED) {
          this.toastrService.error(`Une histoire existe déjà avec ce titre : <b><u>${this.stepTitleForm.value.storyTitle}</u></b>.`);
        } else {
          this.toastrService.error('Une erreur s\'est produite! Merci de réessayer plus tard ou de contacter le support',
            'Erreur technique');
        }
        this.backendOperationInProgress = false;
      }
    );
  }

  onFinish(): void {
    const storyTitle = this.stepTitleForm.value.storyTitle;

    this.createStoryService.initStoryStepTitle(this.stepTitleForm).subscribe(
      (storyId: number) => {
        this.storyId = storyId;
        this.toastrService.success(`L'histoire <b><u>${storyTitle}</b></u> a bien été créée.`);
        this.router.navigate(['../../accueil'], { relativeTo: this.route });
      },
      (errorResponse: HttpErrorResponse) => {
        const apiError: ApiError = errorResponse.error;
        if (apiError.code === ApiErrorCodeEnum.TITLE_ALREADY_USED) {
          this.toastrService.error(`Une histoire existe déjà avec ce titre : <b><u>${this.stepTitleForm.value.storyTitle}</u></b>.`);
        } else {
          this.toastrService.error('Une erreur s\'est produite! Merci de réessayer plus tard ou de contacter le support',
            'Erreur technique');
        }
        this.backendOperationInProgress = false;
      }
    );
  }

}
