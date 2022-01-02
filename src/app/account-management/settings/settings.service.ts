import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { UserPreferences } from '../../shared/model/user/user-preferences.model';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceModification } from '../../shared/model/user/user-preference-modification.model';
import { JsonPatchOperation } from '../../shared/model/json-patch/json-patch-operation.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) {
    }

    savePreference(userPreferenceModification: UserPreferenceModification): Observable<UserPreferences> {
        const userId = this.authService.connectedUser.id;
        const jsonPatchOperation: JsonPatchOperation = {
            op: 'add',
            path: '/' + userPreferenceModification.propertyPath.replaceAll('.', '/'),
            value: <string>userPreferenceModification.value
        }
        return this.apiService.patch(
            `${EndpointEnum.USERS}/${userId}/preferences`,
            [ jsonPatchOperation ],
            {
                headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
            }
        );
    }
}
