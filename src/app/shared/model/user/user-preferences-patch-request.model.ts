import { StoriesDisplayMode } from '../../../account-management/manage-stories/manage-stories-home/stories-list-display-mode.enum';

export interface UserPreferencesPatchRequest {
    appearance?: {
        theme?: number,
        accountManagement?: {
            storiesDisplayMode?: StoriesDisplayMode
        }
    };
}
