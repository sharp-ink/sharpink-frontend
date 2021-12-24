import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { StorySearch } from '../model/story/search/story-search.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Story } from 'src/app/shared/model/story/story.model';

@Injectable()
export class StoryService {
    allStories: Story[] = [];
    allStoriesSubject = new Subject<Story[]>();

    constructor(
        private apiService: ApiService
    ) { }

    /**
     * Loads the list of all stories if not initialized (or if explicitly required by passing 'forceReloading')
     * and broadcast changes to every subscriber of this list.
     */
    loadAllStories(forceReloading?: boolean) {
        if (this.allStories.length === 0 || forceReloading) {
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

    searchStories(title: string, authorName: string) {
        const storySearch: StorySearch = { criteria: {}};

        if (title) {
            storySearch.criteria.title = title;
        }

        if (authorName) {
            storySearch.criteria.authorName = authorName;
        }

        this.searchStoriesHttpObservable(storySearch).subscribe(
          (stories: Story[]) => {
            this.allStories = stories;
            this.allStoriesSubject.next(this.allStories);
          }
        );
    }

    /**
     * Requête pour récupérer toutes les Story depuis le backend.
     * Remarque : ça ne charge pas les chapitres (seulement leur nombre), par contre l'auteur est récupéré.
     * Remarque 2 : on peut passer des paramètres (des filtres) qui affineront la recherche.
     */
    getAllStoriesHttpObservable(): Observable<Story[]> {
        return this.apiService.get<Story[]>(EndpointEnum.STORIES);
    }

    searchStoriesHttpObservable(storySearch: StorySearch): Observable<Story[]> {
        return this.apiService.post(`${EndpointEnum.STORIES}/search`, storySearch);
    }

    /**
     * Retrieves a story by id from the backend.
     * Note: does not retrieve author (only his id), neither chapters (only chapters count + first chapter)
     */
    getStoryById(id: number): Observable<Story> {
        return this.apiService.get<Story>(`${EndpointEnum.STORIES}/${id}`);
    }
}
