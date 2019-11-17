import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from 'src/app/shared/model/member.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedMemberSubject: Subject<Member>;

  constructor(private apiService: ApiService) {
    this.connectedMemberSubject = new Subject<Member>();
  }

  logIn(login: string, password: string): Observable<Member> {
    return this.apiService.get<Member>(`${EndpointEnum.ENDPOINT_ACCOUNTS}/log-in`, {
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

  storeConnectedUser(member: Member) {
    localStorage.connectedUser = JSON.stringify(member);
    this.connectedMemberSubject.next(member);
  }

  getConnectedUser(): Member {
    return (localStorage.connectedUser) ? JSON.parse(localStorage.connectedUser) : null;
  }

  clearConnectedUser() {
    localStorage.removeItem('connectedUser');
    this.connectedMemberSubject.next(null);
  }

}
