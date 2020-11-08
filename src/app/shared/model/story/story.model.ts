import { Chapter } from 'src/app/shared/model/story/chapter/chapter.model';
import { User } from 'src/app/shared/model/user/user.model';

export interface Story {
  id: number;
  title: string;
  type: string;
  originalStory: boolean;
  status: string;
  summary: string;
  thumbnail: string;
  published: boolean;
  authorId: number;                 // toujours rempli, même si on ne charge pas les données de l'auteur
  author: User;                     // ne sera pas toujours rempli (parfois pas besoin de charger l'auteur', son id suffit)
  chaptersNumber: number;           // toujours rempli, même si on ne charge pas les chapitres
  chapters: Chapter[];              // ne sera pas toujours rempli (parfois pas besoin de charger les chapitres, leur nombre suffit)
  creationDate: string;             // date au format YYYYMMDD hh:mm:ss
  lastModificationDate: string;     // date au format YYYYMMDD hh:mm:ss
  finalReleaseDate: string;         // date au format YYYYMMDD hh:mm:ss
  threadId?: number;
}
