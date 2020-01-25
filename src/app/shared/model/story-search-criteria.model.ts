import { StoryPublicationStatusEnum as StoryPublicationStatusEnum } from '../constant/story-publication-status.enum';

export interface StorySearchCriteria {
    count?: number; // number of items to retrieve
    sort?: any; // sort criteria // TODO : specify correct type when determined
    publicationStatus: StoryPublicationStatusEnum;
}
