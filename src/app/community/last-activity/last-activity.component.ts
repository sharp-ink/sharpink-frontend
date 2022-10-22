import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/model/forum/message.model';
import { CommunityService } from '../community.service';

declare const moment: any;

@Component({
    selector: 'app-last-activity',
    templateUrl: './last-activity.component.html',
    styleUrls: ['./last-activity.component.scss']
})
export class LastActivityComponent implements OnInit {
    lastForumMessage: Message;

    constructor(private communityService: CommunityService) {
    }

    ngOnInit(): void {
        this.communityService.getLastForumMessage().subscribe(message => {
           this.lastForumMessage = message;
        });
    }

    format(lastMessageDate: Date): string {
        return moment(lastMessageDate, 'YYYYMMDD hh:mm:ss').fromNow();
    }
}
