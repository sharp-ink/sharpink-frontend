import { AuthService } from './auth.service';
import { ApiService } from './util/api.service';
import { EndpointEnum } from '../constant/endpoint.enum';
import { ThreadRequest } from '../model/forum/thread-request.model';
import { Thread } from '../model/forum/thread.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
