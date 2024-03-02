import {ApiService} from '../shared/service/util/api.service';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {EndpointEnum} from '../shared/constant/endpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  constructor(private apiService: ApiService) { }

  updatePrivateProfile(userId: number, editProfileForm: FormGroup): Observable<any> {
    const profileData = editProfileForm.value;
    delete profileData.externalImageLink;
    return this.apiService.patch(`${EndpointEnum.USERS}/${userId}`, profileData);
  }
}
