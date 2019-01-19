import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Story } from 'src/app/shared/model/story.model';



@Injectable()
export class StoryService {

  allStories: Story[] = [];
  allStoriesSubject = new Subject<Story[]>();

  currentStorySubject = new Subject<Story>();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Requête pour récupérer toutes les Story depuis le backend.
   * Remarque : ça ne charge ni l'auteur (seulement son id) ni les chapitres (seulement leur nombre).
   */
  getAllStoriesHttpObservable(): Observable<Story[]> {
    return this.http.get<Story[]>('http://localhost:8081/api/stories');
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
    return this.http.get<Story>('http://localhost:8081/api/stories/' + id);
  }

  /**
   * Requête pour créer une Story. Renvoie l'id de la Story si la création s'est bien passée.
   */
  createStoryHttpObservable(story: Story): Observable<number> {
    return this.http.post<number>('http://localhost:8081/api/stories', story);
  }

  createStory(story: Story): number {
    let storyId: number;
    this.createStoryHttpObservable(story).subscribe(
      (response) => {
        console.log(response);
        storyId = response;
      },
      (error) => {
        console.log(error);
      }
    );
    return storyId;
  }

}
