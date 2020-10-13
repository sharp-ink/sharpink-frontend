import { User } from '../shared/model/user/user.model';
import { ApiService } from '../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  constructor(private apiService: ApiService) { }

  updatePrivateProfile(memberId: number, editProfileForm: FormGroup): Observable<any> {
    const profileData = editProfileForm.value;
    console.log(`Mise à jour du membre [${memberId}] avec les nouvelles informations suivantes :`, profileData);
    return this.apiService.put(`members/${memberId}/profile`, profileData);
  }

  updateMemberIntoWebStorage(member: User) {
    localStorage.connectedUser = JSON.stringify(member);
  }
}
