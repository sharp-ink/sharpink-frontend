import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/model/member/member.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedMemberSubject: Subject<User>;

  constructor(private apiService: ApiService) {
    this.connectedMemberSubject = new Subject<User>();
  }

  logIn(login: string, password: string): Observable<User> {
    return this.apiService.get<User>(`${EndpointEnum.ACCOUNTS}/log-in`, {
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

  storeConnectedUser(member: User) {
    localStorage.connectedUser = JSON.stringify(member);
    this.connectedMemberSubject.next(member);
  }

  getConnectedUser(): User {
    return (localStorage.connectedUser) ? JSON.parse(localStorage.connectedUser) : null;
  }

  clearConnectedUser() {
    localStorage.removeItem('connectedUser');
    this.connectedMemberSubject.next(null);
  }

}
