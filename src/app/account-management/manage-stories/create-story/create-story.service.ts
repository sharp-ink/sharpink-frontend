import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { StoryStatusEnum } from '../../../shared/constant/story-status.enum';
import { StoryPatchRequest } from '../../../shared/model/story/story-patch-request.model';
import { AuthService } from '../../../shared/service/auth.service';
import { ApiService } from '../../../shared/service/util/api.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateStoryService {
  createStory: StoryPatchRequest; // une histoire complétée au fur et à mesure des étapes du formulaire de création
  storyId: number;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  initStoryStepTitle(stepTitleForm: FormGroup): Observable<any> {
    const fv = stepTitleForm.value;
    this.createStory.title = fv.storyTitle;
    this.createStory.originalStory = fv.storyIsOriginal;
    this.createStory.status = StoryStatusEnum.PROGRESS;
    this.createStory.authorId = this.authService.getConnectedUser().id;
    return this.createStoryObservable(this.createStory);
  }

  completeStoryStepMiscInfo(stepMiscInfoForm: FormGroup) {
    const fv = stepMiscInfoForm.value;
    if (fv.storyType) {
      this.createStory.type = fv.storyType;
    }
    this.updateStoryObservable(this.storyId, this.createStory).subscribe(response => {
      console.log(response);
      this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
    });
  }

  completeStoryStepSummary(stepSummaryForm: FormGroup) {
    const fv = stepSummaryForm.value;
    if (fv.storySummary) {
      this.createStory.summary = fv.storySummary;
    }
    this.updateStoryObservable(this.storyId, this.createStory).subscribe(response => {
      console.log(response);
      this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
    });
  }

  completeStoryStepThumbnail(stepThumbnailForm: FormGroup) {
    const fv = stepThumbnailForm.value;
    if (fv.storyThumbnail) {
      this.createStory.thumbnail = fv.storyThumbnail;
    }
    this.updateStoryObservable(this.storyId, this.createStory).subscribe(response => {
      console.log(response);
      this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
    });
  }

  /**
   * Requête pour créer une Story avec les infos minimales (titre + type). Renvoie l'id de la Story si la création s'est bien passée.
   */
  createStoryObservable(story: StoryPatchRequest): Observable<number> {
    return this.apiService.post<number>(EndpointEnum.STORIES, story);
  }

  /**
   * Requête pour mettre à jour certains éléments d'une Story. Renvoie la Story mise à jour.
   */
  updateStoryObservable(storyId: number, storyPatch: StoryPatchRequest) {
    return this.apiService.patch(`${EndpointEnum.STORIES}/${storyId}`, storyPatch);
  }
}
