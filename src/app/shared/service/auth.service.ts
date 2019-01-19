import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from 'src/app/shared/model/member.model';



@Injectable()
export class AuthService {

  // Le membre actuellement connecté (authentifié avec succès)
  connectedMemberSubject = new Subject<Member>();
  connectedMember: Member = null;

  constructor(
    private http: HttpClient
  ) { }

  logIn(login: string, password: string): Observable<Member> {
    return this.http.get<Member>('http://localhost:8081/api/accounts/log-in', {
      params: {
        login: login,
        password: password
      }
    })
      .pipe(
        catchError(
          (error) => {
            return throwError(error);
          }
        )
    );
  }

}
