import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Story } from '../model/story/story.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user/user.model';

@Injectable()
export class UserService {

  // La liste des membres de la communauté
  allMembers: User[] = [];
  allMembersSubject = new Subject<User[]>();

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Requête pour récupérer tous les Member depuis le backend.
   * Remarque : pour chaque Member, ça ne charge pas ses Story, seulement leur nombre.
   */
  getAllMembersHttpObservable(): Observable<User[]> {
    return this.apiService.get<User[]>(EndpointEnum.USERS);
  }

  /**
   * Force le chargement de la liste des membres si elle n'avait pas encore été initialisée,
   * et transmet les changements à tous ceux ayant souscrit à l'Observable.
   */
  loadAllMembers() {

    if (this.allMembers.length === 0) {
      this.getAllMembersHttpObservable().subscribe(
        (members: User[]) => {
          this.allMembers = members;
          this.allMembersSubject.next(this.allMembers);
        }
      );
    } else {
      this.allMembersSubject.next(this.allMembers);
    }

  }

  /**
   * Requête pour récupérer un Member donné depuis le backend, via son id.
   * Remarque : ça ne charge pas ses Story, seulement leur nombre.
   */
  getMemberObservable(memberId: number): Observable<User> {
    return this.apiService.get<User>(`${EndpointEnum.USERS}/${memberId}`);
  }

  /**
   * Load stories of the given member
   */
  loadStoriesOfAuthor(memberId: number): Observable<Story[]> {
    return this.apiService.get<Story[]>(`${EndpointEnum.USERS}/${memberId}/stories`);
  }

}
