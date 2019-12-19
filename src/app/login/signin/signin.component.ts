import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/shared/model/member/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AuthGuard } from 'src/app/shared/service/guard/auth.guard';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formValue = this.signinForm.value;
    this.authService.logIn(formValue.login, formValue.password)
      .subscribe(
        (member: Member) => {
          console.log('authentifié en tant que :', member);
          this.authService.storeConnectedUser(member);
          this.router.navigateByUrl(this.authGuard.requestedUrl);
        },
        (error) => {
          console.log('Erreur d\'authentification. Code erreur : ' + error.status);
        }
      );
  }

}
