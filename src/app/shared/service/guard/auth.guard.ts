import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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
    if (this.authService.connectedUser != null) {
      return true;
    } else {
      // on stocke l'URL à laquelle on tente d'accéder
      this.requestedUrl = state.url;
      this.router.navigate(['/connexion']);
    }
  }

}
