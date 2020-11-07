import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { Message } from '../../shared/model/forum/message.model';
import { ThreadRequest } from '../../shared/model/forum/thread-request.model';
import { Thread } from '../../shared/model/forum/thread.model';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/util/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ForumService {

    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    loadThreadsObservable(): Observable<Thread[]> {
        return this.apiService.get(EndpointEnum.THREADS);
    }

    createThread(title: string): void {
        const originalAuthorId = this.authService.connectedUser.id;
        const thread: ThreadRequest = {
            originalAuthorId,
            title
        };
        this.apiService.post<number>(EndpointEnum.THREADS, thread).subscribe(
            (threadId: number) => {
                // console.log(threadId);
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    getThreadByIdObservable(id: number) {
        return this.apiService.get(`${EndpointEnum.THREADS}/${id}`);
    }

    createMessage(threadId: number, content: string): Observable<number> {
        const authorId = this.authService.connectedUser.id;
        const message = {
            authorId,
            content
        };
        return this.apiService.post(`${EndpointEnum.THREADS}/${threadId}`, message);
    }

    isMessageByConnectedUser(message: Message) {
        return this.authService.connectedUser &&  message.authorId === this.authService.connectedUser.id;
    }

    removeChapter(threadId: number, message: Message): Observable<any> {
        const connectedUserId = this.authService.connectedUser.id;
        if (connectedUserId === message.authorId) {
            return this.apiService.delete(`${EndpointEnum.THREADS}/${threadId}/messages/${message.number}`);
        } else {
            return EMPTY;
        }
    }
}
