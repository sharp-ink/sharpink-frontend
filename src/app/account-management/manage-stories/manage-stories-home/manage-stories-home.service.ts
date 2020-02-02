import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { Story } from '../../../shared/model/story/story.model';
import { ApiService } from '../../../shared/service/util/api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ManageStoriesHomeService {

    constructor(
        private apiService: ApiService
    ) { }

    changeStoryStatus(story: Story) {
        return this.apiService.patch(`${EndpointEnum.STORIES}/${story.id}`, {
            published: !story.published
        });
    }

}
