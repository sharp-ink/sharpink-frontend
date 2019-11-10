import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/model/member.model';
import { AuthService } from 'src/app/shared/service/auth.service';



/**
 * Guard pour vérifier si l'utilisateur est authentifié.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  // variable qui retient la dernière URL demandée, ainsi on peut rediriger dessus suite à une authentification réussie
  requestedUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const connectedMemberInWebStorage = this.authService.getConnectedUser();
    if (connectedMemberInWebStorage != null) {
      return true;
    } else {
      // on stocke l'URL à laquelle on tente d'accéder
      this.requestedUrl = state.url;
      this.router.navigate(['/connexion']);
    }
  }

}
