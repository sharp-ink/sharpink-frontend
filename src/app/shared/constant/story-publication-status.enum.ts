
export enum StoryPublicationStatusEnum {
    ALL = 'ALL',
    PUBLISHED = 'PUBLISHED',
    NOT_PUBLISHED = 'NOT_PUBLISHED'
}

export namespace StoryPublicationStatusEnum {
    export function toOptionalBoolean(storyPublicationStatus: StoryPublicationStatusEnum): boolean {
        switch (storyPublicationStatus) {
            case StoryPublicationStatusEnum.PUBLISHED: return true;
            case StoryPublicationStatusEnum.NOT_PUBLISHED: return false;
            default: return null;
        }
    }
}
