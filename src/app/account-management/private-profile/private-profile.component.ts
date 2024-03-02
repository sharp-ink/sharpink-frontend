import { AccountManagementService } from '../account-management.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/model/user/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.scss']
})
export class PrivateProfileComponent implements OnInit {

  user: User;
  hasProfileDetails = false; // indique si l'utilisateur a des informations sur son profil (pas nécessairement terminé)
  isEditingProfile = false;
  editProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accountManagementService: AccountManagementService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.connectedUser; // nécessairement renseigné puisqu'on a passé la guard
    this.initForm();

    if (this.user.userDetails != null) {
      this.hasProfileDetails = true;
    }
  }

  initForm(): void {
    this.editProfileForm = this.fb.group({
      'nickname': this.fb.control(this.user.nickname),
      'email': this.fb.control(this.user.email),
      'firstName': this.fb.control(this.user.userDetails ? this.user.userDetails.firstName : ''),
      'lastName': this.fb.control(this.user.userDetails ? this.user.userDetails.lastName : ''),
      'profilePicture': this.fb.control(''),
      'externalImageLink': this.fb.control(''),
    });
  }

  toggleEditingMode(): void {
    this.isEditingProfile = !this.isEditingProfile;
  }

  onFileChange(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.editProfileForm.patchValue({
        profilePicture: reader.result
      });
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    };
  }

  updateProfile(): void {
    // for profile picture, choose between uploaded image or external URL typed in input
    if (this.editProfileForm.value.profilePicture === '' && this.editProfileForm.value.externalImageLink !== '') {
      this.editProfileForm.patchValue({
        profilePicture: this.editProfileForm.value.externalImageLink
      });
    }

    this.accountManagementService.updatePrivateProfile(this.user.id, this.editProfileForm).subscribe(
      updatedUser => {
        this.toggleEditingMode();
        this.user = updatedUser;
        this.authService.storeConnectedUser(updatedUser);
      },
      error => console.log(error)
    );
  }

}
