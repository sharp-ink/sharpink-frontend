import { StoryStatusEnum } from '../../constant/story-status.enum';
import { StoryTypeEnum } from '../../constant/story-type.enum';

export interface CreateStory {
    title?: string;
    type?: StoryTypeEnum;
    isOriginal?: boolean;
    status?: StoryStatusEnum;
    authorId?: number;
    summary?: string; // html string
    thumbnail?: string; // base64 thumbnail
    // TODO
}
