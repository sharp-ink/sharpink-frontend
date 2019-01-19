
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from 'src/app/shared/model/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isLogged: boolean;
  connectedMember: Member = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.connectedMemberSubject.subscribe(
      (member: Member) => {
        this.connectedMember = member;
        this.isLogged = this.connectedMember != null;
      }
    );
  }

  onLogin() {
    this.router.navigate(['/connexion']);
  }

  onLogout() {
    // on supprime l'utilisateur connecté
    this.authService.connectedMemberSubject.next(null);
  }

}
