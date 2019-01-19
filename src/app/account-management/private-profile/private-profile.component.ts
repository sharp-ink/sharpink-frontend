import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from 'src/app/shared/model/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit {

  // indique si l'utilisateur a des informations sur son profil (pas nécessairement terminé)
  hasProfileDetails = false;

  firstName: string;
  lastName: string;
  birthDate: Date;
  location: {
    country: string,
    city: string
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    const member: Member = this.authService.connectedMember;

    // Si l'utilisateur a des informations renseignées
    if (member.memberDetails != null) {

      this.hasProfileDetails = true;

      this.firstName = member.memberDetails.firstName;
      this.lastName = member.memberDetails.lastName;
      this.birthDate = member.memberDetails.birthDate;
      this.location = {
        country: member.memberDetails.country,
        city: member.memberDetails.city
      };

    }

  }

}
