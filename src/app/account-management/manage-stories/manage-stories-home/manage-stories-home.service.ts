import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { Story } from '../../../shared/model/story/story.model';
import { ApiService } from '../../../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManageStoriesHomeService {

    constructor(private apiService: ApiService) { }

    changePublicationStatus(story: Story) {
        return this.apiService.patch(`${EndpointEnum.STORIES}/${story.id}`, {
            published: !story.published
        });
    }

    changeStatus(story: Story): Observable<Story> {
        // story contains an updated status, we have to send it to the backend to persist it
        return this.apiService.patch(`${EndpointEnum.STORIES}/${story.id}`, {
            status: story.status
        });
    }

    removeStory(storyId: number): Observable<Story> {
        return this.apiService.delete(`${EndpointEnum.STORIES}/${storyId}`);
    }

}
