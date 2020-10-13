import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { UserPreferences } from '../model/user/user-preferences.model';
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
  connectedUserPreferences: UserPreferences;
  connectedUserPreferencesSubject: Subject<UserPreferences>;

  constructor(private apiService: ApiService) {
    this.connectedUserSubject = new Subject<User>();
    this.connectedUserPreferencesSubject = new Subject<UserPreferences>();
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

  getConnectedUserFromCookies(): User {
    return (localStorage.connectedUser) ? JSON.parse(localStorage.connectedUser) : null;
  }

  getConnectedUserPreferencesFromCookies(): UserPreferences {
    return (localStorage.connectedUserPreferences) ? JSON.parse(localStorage.connectedUserPreferences) : null;
  }

  storeConnectedUser(user: User) {
    this.connectedUser = user;
    localStorage.connectedUser = JSON.stringify(user);
    this.connectedUserSubject.next(user);
  }

  storeConnectedUserPreferences(userPreferences: UserPreferences) {
    this.connectedUserPreferences = userPreferences;
    localStorage.connectedUserPreferences = JSON.stringify(userPreferences);
    this.connectedUserPreferencesSubject.next(userPreferences);
  }

  clearConnectionData() {
    this.clearConnectedUser();
    this.clearConnectedUserPreferences();
  }

  private clearConnectedUser(): void {
    localStorage.removeItem('connectedUser');
    this.connectedUser = null;
    this.connectedUserSubject.next(null);
  }

  private clearConnectedUserPreferences() {
    localStorage.removeItem('connectedUserPreferences');
    this.connectedUserPreferences = null;
    this.connectedUserPreferencesSubject.next(null);
  }

}
