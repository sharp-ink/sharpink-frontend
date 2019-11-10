import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Member } from 'src/app/shared/model/member.model';

@Injectable()
export class MemberService {

  // La liste des membres de la communauté
  allMembers: Member[] = [];
  allMembersSubject = new Subject<Member[]>();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Requête pour récupérer tous les Member depuis le backend.
   * Remarque : pour chaque Member, ça ne charge pas ses Story, seulement leur nombre.
   */
  getAllMembersHttpObservable(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:8081/api/members');
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
    return this.http.get<Member>('http://localhost:8081/api/members/' + memberId);
  }

}
