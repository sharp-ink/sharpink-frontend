import { ThemeService } from '../../shared/service/theme.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/model/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.scss']
})
export class PrivateProfileComponent implements OnInit {

  member: Member;
  hasProfileDetails = false; // indique si l'utilisateur a des informations sur son profil (pas nécessairement terminé)
  isEditingProfile = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.member = this.authService.getConnectedUser(); // nécessairement renseigné puisqu'on a passé la guard

    if (this.member.memberDetails != null) {
      this.hasProfileDetails = true;
    }
  }

  toggleEditingMode(): void {
    this.isEditingProfile = !this.isEditingProfile;
  }

  updateProfile(): void {
    // TODO
  }

}
