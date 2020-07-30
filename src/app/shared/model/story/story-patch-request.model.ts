import { StoryStatusEnum } from '../../constant/story-status.enum';
import { StoryTypeEnum } from '../../constant/story-type.enum';

export interface StoryPatchRequest {
    title?: string;
    originalStory?: boolean;
    type?: StoryTypeEnum;
    status?: StoryStatusEnum;
    authorId?: number;
    summary?: string; // html string
    thumbnail?: string; // base64 thumbnail
    // TODO
}
