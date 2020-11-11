import { StoryPatchRequest } from './story-patch-request.model';

export interface StoryCreationRequest extends StoryPatchRequest {
    authorId: number;
}
