import { CreateStoryComponent } from '../../../account-management/manage-stories/create-story/create-story.component';
import { CreateStoryService } from '../../../account-management/manage-stories/create-story/create-story.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CreateStoryStepsFormGuard implements CanDeactivate<CreateStoryComponent> {

  constructor(
    private createStoryService: CreateStoryService
  ) { }

  canDeactivate(
    component: CreateStoryComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.createStoryService.story = null;
    return true;
  }

}
