
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Member } from 'src/app/shared/model/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';

/**
 * Guard pour vérifier si l'utilisateur est authentifié.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  connectedMember: Member = null;

  // variable qui retient la dernière URL demandée, ainsi on peut rediriger dessus suite à une authentification réussie
  requestedUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.authService.connectedMemberSubject.subscribe(
      (member: Member) => {
        this.connectedMember = member;
      }
    );

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.connectedMember != null) {
      return true;
    } else {
      // on stocke l'URL à laquelle on tente d'accéder
      this.requestedUrl = state.url;
      this.router.navigate(['/connexion']);
    }
  }

}
