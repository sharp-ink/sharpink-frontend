import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { StoryStatusEnum } from '../../shared/constant/story-status.enum';
import { CreateStory } from '../../shared/model/story/create-story.model';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateStoryService {
  createStory: CreateStory; // une histoire complétée au fur et à mesure des étapes du formulaire de création
  storyId: number;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  initStoryStepTitle(stepTitleForm: FormGroup): Observable<any> {
    const fv = stepTitleForm.value;
    this.createStory.title = fv.storyTitle;
    this.createStory.isOriginal = fv.storyIsOriginal;
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
    });
  }

  completeStoryStepSummary(stepSummaryForm: FormGroup) {
    const fv = stepSummaryForm.value;
    if (fv.storySummary) {
      this.createStory.summary = fv.storySummary;
    }
    this.updateStoryObservable(this.storyId, this.createStory).subscribe(response => {
      console.log(response);
    });
  }

  completeStoryStepThumbnail(stepThumbnailForm: FormGroup) {
    const fv = stepThumbnailForm.value;
    if (fv.storyThumbnail) {
      this.createStory.thumbnail = fv.storyThumbnail;
    }
    this.updateStoryObservable(this.storyId, this.createStory).subscribe(response => {
      console.log(response);
    });
  }

  /**
   * Requête pour créer une Story avec les infos minimales (titre + type). Renvoie l'id de la Story si la création s'est bien passée.
   */
  createStoryObservable(story: CreateStory): Observable<number> {
    return this.apiService.post<number>(EndpointEnum.ENDPOINT_STORIES, story);
  }

  /**
   * Requête pour mettre à jour certains éléments d'une Story. Renvoie la Story mise à jour.
   */
  updateStoryObservable(storyId: number, storyPatch: CreateStory) {
    return this.apiService.patch(`${EndpointEnum.ENDPOINT_STORIES}/${storyId}`, storyPatch);
  }
}
