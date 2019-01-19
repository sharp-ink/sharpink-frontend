
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Member } from 'src/app/shared/model/member.model';
import { MemberService } from 'src/app/shared/service/member.service';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css'],
})
export class ListMembersComponent implements OnInit, OnDestroy {

  allMembers: Member[] = [];
  allMembersSubscription: Subscription;

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.allMembersSubscription = this.memberService.allMembersSubject.subscribe(
      (members: Member[]) => {
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
