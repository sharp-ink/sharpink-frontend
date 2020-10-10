import { AccountManagementService } from '../account-management.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/model/member/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.scss']
})
export class PrivateProfileComponent implements OnInit {

  member: User;
  hasProfileDetails = false; // indique si l'utilisateur a des informations sur son profil (pas nécessairement terminé)
  isEditingProfile = false;
  editProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private accountManagementService: AccountManagementService
  ) { }

  ngOnInit() {
    this.member = this.authService.getConnectedUser(); // nécessairement renseigné puisqu'on a passé la guard
    this.initForm();

    if (this.member.memberDetails != null) {
      this.hasProfileDetails = true;
    }
  }

  initForm() {
    this.editProfileForm = this.fb.group({
      'nickname': this.fb.control(this.member.nickname),
      'email': this.fb.control(this.member.email),
      'firstName': this.fb.control(this.member.memberDetails ? this.member.memberDetails.firstName : ''),
      'lastName': this.fb.control(this.member.memberDetails ? this.member.memberDetails.lastName : ''),
      'profilePicture': this.fb.control('')
    });
  }

  toggleEditingMode(): void {
    this.isEditingProfile = !this.isEditingProfile;
  }

  onFileChange(file: File) {
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
    this.accountManagementService.updatePrivateProfile(this.member.id, this.editProfileForm).subscribe(
      updatedMember => {
        console.log(`Le membre ${this.member.id} a bien été mis à jour`, updatedMember);
        this.toggleEditingMode();
        this.member = updatedMember;
        this.accountManagementService.updateMemberIntoWebStorage(updatedMember);
      },
      error => console.log(error)
    );
  }

}
