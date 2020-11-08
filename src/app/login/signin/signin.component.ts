import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { UserPreferences } from '../../shared/model/user/user-preferences.model';
import { ApiService } from '../../shared/service/util/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user/user.model';
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
    private apiService: ApiService,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const formValue = this.signinForm.value;
    this.authService.logIn(formValue.login, formValue.password)
      .subscribe(
        (user: User) => {
          console.log('authentifié en tant que :', user);
          this.authService.storeConnectedUser(user);
          this.router.navigateByUrl(this.authGuard.requestedUrl);
          this.apiService.get(`${EndpointEnum.USERS}/${user.id}/preferences`).subscribe(
            (userPreferences: UserPreferences) => {
              this.authService.storeConnectedUserPreferences(userPreferences);
            });
        },
        (error) => {
          console.log('Erreur d\'authentification. Code erreur : ' + error.status);
        }
      );
  }

  private initForm() {
    this.signinForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('')
    });
  }
}
