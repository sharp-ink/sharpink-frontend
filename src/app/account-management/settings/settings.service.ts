import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { UserPreferencesPatchRequest } from '../../shared/model/user/user-preferences-patch-request.model';
import { UserPreferences } from '../../shared/model/user/user-preferences.model';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  savePreference(userPreferencesPatchRequest: UserPreferencesPatchRequest): Observable<UserPreferences> {
    const userId = this.authService.connectedUser.id;
    return this.apiService.patch(`${EndpointEnum.USERS}/${userId}/preferences`, userPreferencesPatchRequest);
  }
}
