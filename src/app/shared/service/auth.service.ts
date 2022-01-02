import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: User;
  connectedUserSubject: Subject<User>;

  constructor(private apiService: ApiService) {
    this.connectedUserSubject = new Subject<User>();
  }

  logIn(login: string, password: string): Observable<User> {
    return this.apiService.get<User>(`${EndpointEnum.AUTHENTICATION}/log-in`, {
      params: { login, password }
    })
      .pipe(
        catchError(
          (error) => {
            return throwError(error);
          }
        )
      );
  }

  getConnectedUserFromLocalStorage(): User {
    return localStorage.getItem('connectedUser') ? JSON.parse(localStorage.getItem('connectedUser')) : null;
  }

  storeConnectedUser(user: User) {
    this.connectedUser = user;
    localStorage.setItem('connectedUser', JSON.stringify(user));
    this.connectedUserSubject.next(user);
  }

  clearConnectedUser(): void {
    localStorage.removeItem('connectedUser');
    this.connectedUser = null;
    this.connectedUserSubject.next(null);
  }

}
