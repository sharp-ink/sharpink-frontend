import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Story } from '../model/story/story.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Member } from 'src/app/shared/model/member/member.model';

@Injectable()
export class MemberService {

  // La liste des membres de la communauté
  allMembers: Member[] = [];
  allMembersSubject = new Subject<Member[]>();

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Requête pour récupérer tous les Member depuis le backend.
   * Remarque : pour chaque Member, ça ne charge pas ses Story, seulement leur nombre.
   */
  getAllMembersHttpObservable(): Observable<Member[]> {
    return this.apiService.get<Member[]>(EndpointEnum.MEMBERS);
  }

  /**
   * Force le chargement de la liste des membres si elle n'avait pas encore été initialisée,
   * et transmet les changements à tous ceux ayant souscrit à l'Observable.
   */
  loadAllMembers() {

    if (this.allMembers.length === 0) {
      this.getAllMembersHttpObservable().subscribe(
        (members: Member[]) => {
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
  getMemberObservable(memberId: number): Observable<Member> {
    return this.apiService.get<Member>(`${EndpointEnum.MEMBERS}/${memberId}`);
  }

  /**
   * Load stories of the given member
   */
  loadStoriesOfAuthor(memberId: number): Observable<Story[]> {
    return this.apiService.get<Story[]>(`${EndpointEnum.MEMBERS}/${memberId}/stories`);
  }

}
