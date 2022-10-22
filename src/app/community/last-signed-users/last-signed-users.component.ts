import { Component, OnInit } from '@angular/core';
import { Story } from '../../shared/model/story/story.model';
import { User } from '../../shared/model/user/user.model';
import { CommunityService } from '../community.service';

declare const moment: any;

@Component({
    selector: 'app-last-signed-users',
    templateUrl: './last-signed-users.component.html',
    styleUrls: ['./last-signed-users.component.scss']
})
export class LastSignedUsersComponent implements OnInit {
    lastSignedUsers: User[] = [];

    constructor(private communityService: CommunityService) {
    }

    ngOnInit(): void {
        this.communityService.getLastSignedMembers().subscribe(users => {
            this.lastSignedUsers = users;
        });
    }

    format(registrationDate: Date): string {
        return moment(registrationDate, 'YYYYMMDD hh:mm:ss').fromNow();
    }

}
