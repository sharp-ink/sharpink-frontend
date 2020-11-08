import { EndpointEnum } from '../../shared/constant/endpoint.enum';
import { Message } from '../../shared/model/forum/message.model';
import { ThreadRequest } from '../../shared/model/forum/thread-request.model';
import { Thread } from '../../shared/model/forum/thread.model';
import { Story } from '../../shared/model/story/story.model';
import { AuthService } from '../../shared/service/auth.service';
import { ApiService } from '../../shared/service/util/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ForumService {

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router
    ) { }

    loadThreadsObservable(): Observable<Thread[]> {
        return this.apiService.get(EndpointEnum.THREADS);
    }

    createThread(title: string, storyId?: number): Observable<number> {
        const originalAuthorId = this.authService.connectedUser.id;
        const thread: ThreadRequest = {
            originalAuthorId,
            title,
            storyId: storyId || null
        };

        return this.apiService.post<number>(EndpointEnum.THREADS, thread);
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

    goToStoryThread(story: Story, event?: Event) {
        if (event) {
            event.stopPropagation();
        }

        if (story.threadId) {
            this.router.navigate(['/communaute/forum/discussion/', story.threadId]);
        } else {
            if (confirm(`La discussion n'existe pas encore pour cette histoire, voulez-vous la créer ?`)) {
                this.createThread(`${story.title} (avis)`, story.id).subscribe(threadId => {
                    this.router.navigate(['/communaute/forum/discussion/', threadId]);
                });
            }
        }
    }
}
