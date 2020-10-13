import { User } from '../../model/user/user.model';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Guard pour vérifier si l'id de l'utilisateur et l'id du membre possédant la page coïncident
 * (par exemple la page d'édition d'une histoire, il ne suffit pas d'être authentifié, encore faut-il
 * être l'auteur de l'histoire).
 */
@Injectable()
export class MemberGuard implements CanActivate {
  connectedUserId: number = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.connectedUserSubject.subscribe(
      (user: User) => {
        this.connectedUserId = user.id;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requestedMemberId = +route.params['id'];
    console.log(requestedMemberId);
    console.log(this.connectedUserId);
    if (this.connectedUserId === requestedMemberId) {
      return true;
    } else {
      this.router.navigate(['/403-acces-interdit']);
    }
  }
}
