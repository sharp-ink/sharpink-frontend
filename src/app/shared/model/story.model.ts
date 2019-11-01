import { Chapter } from 'src/app/shared/model/chapter.model';
import { Member } from 'src/app/shared/model/member.model';

export interface Story {
  id?: number; // optionnel, non renseigné lors de la création
  title: string;
  type: string;
  originalStory: boolean;
  summary: string;
  status: string;
  published: boolean;
  authorId: number;                 // toujours rempli, même si on ne charge pas les données de l'auteur
  author: Member;                   // ne sera pas toujours rempli (parfois pas besoin de charger l'auteur', son id suffit)
  chaptersNumber: number;           // toujours rempli, même si on ne charge pas les chapitres
  chapters: Chapter[];              // ne sera pas toujours rempli (parfois pas besoin de charger les chapitres, leur nombre suffit)
  creationDate: string;             // date au format YYYYMMDD hh:mm:ss
  lastModificationDate: string;     // date au format YYYYMMDD hh:mm:ss
  finalReleaseDate: string;         // date au format YYYYMMDD hh:mm:ss
}
