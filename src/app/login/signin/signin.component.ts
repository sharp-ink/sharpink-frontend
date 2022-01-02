import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AuthGuard } from 'src/app/shared/service/guard/auth.guard';
import { ThemeService } from '../../shared/service/theme.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private authGuard: AuthGuard,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const formValue = this.signinForm.value;
    this.authService.logIn(formValue.login, formValue.password)
      .subscribe(
        (user: User) => {
          this.authService.storeConnectedUser(user);
          // apply user's preferred theme
          this.themeService.loadTheme(user.userPreferences?.appearance?.theme ?? this.themeService.DEFAULT_THEME_ID);

          this.router.navigateByUrl(this.authGuard.requestedUrl);
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
