import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/shared/model/member/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';



@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  connectedUser: Member;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.connectedUser = this.authService.getConnectedUser();
    this.authService.connectedMemberSubject.subscribe((connectedMember: Member) => {
      this.connectedUser = connectedMember;
    });
  }

  login() {
    this.router.navigate(['/connexion']);
  }

  logout() {
    this.authService.clearConnectedUser();
  }

}
