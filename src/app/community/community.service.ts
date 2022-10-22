import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointEnum } from '../shared/constant/endpoint.enum';
import { Message } from '../shared/model/forum/message.model';
import { User } from '../shared/model/user/user.model';
import { ApiService } from '../shared/service/util/api.service';

@Injectable({
    providedIn: 'root'
})
export class CommunityService {

    constructor(private apiService: ApiService) {
    }

    getLastSignedMembers(): Observable<User[]> {
        return this.apiService.get<User[]>(`${EndpointEnum.USERS}/last-registered-users`);
    }

    getLastForumMessage(): Observable<Message> {
        return this.apiService.get<Message>(`${EndpointEnum.THREADS}/last-forum-message`);
    }
}
