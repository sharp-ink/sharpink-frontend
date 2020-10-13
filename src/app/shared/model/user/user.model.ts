import { UserDetails } from './user-details.model';
import { Story } from 'src/app/shared/model/story/story.model';

export interface User {
  id: number;
  nickname: string;
  email: string;
  storiesCount: number;
  stories: Story[]; // ne sera pas toujours chargé, parfois on se contentera de storiesCount
  userDetails: UserDetails;
}
