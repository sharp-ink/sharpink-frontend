import { StoriesDisplayMode as StoriesDisplayMode } from '../../../account-management/manage-stories/manage-stories-home/stories-list-display-mode.enum';

export interface UserPreferences {
    appearance: {
        theme: number;
        accountManagement: {
            storiesDisplayMode: StoriesDisplayMode
        }
    };
}
