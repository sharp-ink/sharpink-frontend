import { UserDetails } from './user-details.model';
import { Story } from 'src/app/shared/model/story/story.model';
import {UserPreferences} from './user-preferences.model';

export interface User {
  id: number;
  nickname: string;
  email: string;
  registrationDate: Date;
  storiesCount: number;
  stories?: Story[]; // not systematically loaded, sometimes we have enough information with storiesCount
  userDetails?: UserDetails;
  userPreferences?: UserPreferences;
}
