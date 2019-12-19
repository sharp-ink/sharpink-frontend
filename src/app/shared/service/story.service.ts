import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Story } from 'src/app/shared/model/story/story.model';

@Injectable()
export class StoryService {

  allStories: Story[] = [];
  allStoriesSubject = new Subject<Story[]>();

  currentStorySubject = new Subject<Story>();

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Requête pour récupérer toutes les Story depuis le backend.
   * Remarque : ça ne charge ni l'auteur (seulement son id) ni les chapitres (seulement leur nombre).
   */
  getAllStoriesHttpObservable(): Observable<Story[]> {
    return this.apiService.get<Story[]>(EndpointEnum.ENDPOINT_STORIES);
  }

  /**
   * Force le chargement de la liste des histoires si elle n'avait pas encore été initialisée,
   * et transmet les changements à tous ceux ayant souscrit à l'Observable.
   */
  loadAllStories() {

    if (this.allStories.length === 0) {
      this.getAllStoriesHttpObservable().subscribe(
        (stories: Story[]) => {
          this.allStories = stories;
          this.allStoriesSubject.next(this.allStories);
        }
      );
    } else {
      this.allStoriesSubject.next(this.allStories);
    }

  }

  /**
   * Récupère une histoire via son id. Renvoie les informations de la Story + le premier Chapter s'il y en a un.
   */
  getStoryById(id: number) {
    this.getStoryByIdHttpObservable(id).subscribe(
      (s: Story) => {
        this.currentStorySubject.next(s);
      }
    );
  }

  /**
   * Requête pour récupérer une Story depuis le backend.
   * Remarque : ça ne charge pas l'auteur (seulement son id) ni tous les chapitres (seulement leur nombre),
   * mais on renvoie tout de même le premier chapitre par commodité.
   */
  getStoryByIdHttpObservable(id: number): Observable<Story> {
    return this.apiService.get<Story>(`${EndpointEnum.ENDPOINT_STORIES}/${id}`);
  }
}
