import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { StoryStatusEnum } from '../../../shared/constant/story-status.enum';
import { StoryPatchRequest } from '../../../shared/model/story/story-patch-request.model';
import { Story } from '../../../shared/model/story/story.model';
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
  story: StoryPatchRequest; // une histoire complétée au fur et à mesure des étapes du formulaire de création

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  initStoryStepTitle(stepTitleForm: FormGroup): Observable<number | Story> {
    const fv = stepTitleForm.value;
    this.story.title = fv.storyTitle;
    this.story.originalStory = fv.storyIsOriginal;
    this.story.status = StoryStatusEnum.PROGRESS;
    this.story.authorId = this.authService.connectedUser.id;
    if (this.story.id) {
      return this.updateStoryObservable(this.story);
    } else {
      return this.createStoryObservable(this.story);
    }
  }

  completeStoryStepMiscInfo(stepMiscInfoForm: FormGroup) {
    const fv = stepMiscInfoForm.value;
    if (fv.storyType) {
      this.story.type = fv.storyType;
    }
    this.updateStoryObservable(this.story).subscribe(response => {
      this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
    });
  }

  completeStoryStepSummary(stepSummaryForm: FormGroup) {
    const fv = stepSummaryForm.value;
    if (fv.storySummary) {
      this.story.summary = fv.storySummary;
    }
    this.updateStoryObservable(this.story).subscribe(response => {
      this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
    });
  }

  completeStoryStepThumbnail(stepThumbnailForm: FormGroup) {
    const fv = stepThumbnailForm.value;
    if (fv.storyThumbnail) {
      this.story.thumbnail = fv.storyThumbnail;
    }
    this.updateStoryObservable(this.story).subscribe(response => {
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
  updateStoryObservable(storyPatch: StoryPatchRequest): Observable<Story> {
    return this.apiService.patch(`${EndpointEnum.STORIES}/${storyPatch.id}`, storyPatch);
  }
}
