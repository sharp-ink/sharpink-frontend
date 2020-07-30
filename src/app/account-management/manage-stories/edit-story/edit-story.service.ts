import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { StoryPatchRequest } from '../../../shared/model/story/story-patch-request.model';
import { Story } from '../../../shared/model/story/story.model';
import { ApiService } from '../../../shared/service/util/api.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class EditStoryService {

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    updateStoryInfo(story: Story, storyInformationsForm: FormGroup) {
        const fv = storyInformationsForm.value;
        console.log(fv);
        const storyPatchRequest: StoryPatchRequest = {
            authorId: story.authorId,
            title: fv.storyTitle,
            type: fv.storyType,
            originalStory: fv.storyIsOriginal,
            summary: fv.storySummary,
            thumbnail: fv.storyThumbnail
        };
        this.updateStoryObservable(story.id, storyPatchRequest).subscribe(response => {
          console.log(response);
            this.notificationService.success('Les informations de l\'histoire ont bien été mises à jour.');
            this.router.navigate(['/mon-compte/mes-histoires'], { relativeTo: this.route }); // we are on route 'mon-compte'
        });
    }

    private updateStoryObservable(storyId: number, storyPatchRequest: StoryPatchRequest) {
        return this.apiService.patch(`${EndpointEnum.STORIES}/${storyId}`, storyPatchRequest);
      }

}
