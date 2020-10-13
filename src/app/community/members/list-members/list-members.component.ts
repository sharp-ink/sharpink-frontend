import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/model/user/user.model';
import { UserService } from 'src/app/shared/service/user.service';



@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css'],
})
export class ListMembersComponent implements OnInit, OnDestroy {

  allMembers: User[] = [];
  allMembersSubscription: Subscription;

  constructor(
    private memberService: UserService
  ) { }

  ngOnInit() {
    this.allMembersSubscription = this.memberService.allMembersSubject.subscribe(
      (members: User[]) => {
        this.allMembers = members;
      }
    );
    this.loadAllMembers();
  }

  ngOnDestroy() {
    this.allMembersSubscription.unsubscribe();
  }

  loadAllMembers() {
    this.memberService.loadAllMembers();

  }

}
