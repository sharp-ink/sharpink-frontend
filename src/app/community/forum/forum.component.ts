import { ForumService } from './forum.service';
import { Thread } from '../../shared/model/forum/thread.model';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, AfterViewChecked {
    isLoading: boolean;
    creationFormVisible = false;
    showCreationFormClicked = false;
    hideCreationFormClicked = false;
    threadCreationForm: FormGroup;
    threadsSearchForm: FormGroup;
    @ViewChild('threadTitleElement') threadTitleElement: ElementRef;
    threads: Thread[];

    constructor(private forumService: ForumService) { }

    ngOnInit() {
        this.isLoading = true;
        this.loadThreads();
        this.initThreadCreationForm();
        this.initSearchForm();
    }

    ngAfterViewChecked() {
        if ((this.showCreationFormClicked || this.hideCreationFormClicked) && this.creationFormVisible) {
            const textareaElement: HTMLElement = this.threadTitleElement.nativeElement;
            textareaElement.focus();
        }

        this.showCreationFormClicked = false;
        this.hideCreationFormClicked = false;
    }

    showCreationForm() {
        this.threadCreationForm.reset();
        this.showCreationFormClicked = true;
        this.creationFormVisible = true;
    }

    hideCreationForm() {
        this.hideCreationFormClicked = true;
        this.creationFormVisible = false;
    }

    createThread() {
        this.forumService.createThread(this.threadCreationForm.value.threadTitle).pipe(
            switchMap(() => this.forumService.getThreads())
        ).subscribe(threads => this.threads = threads);
    }

    searchThreads() {
        const title = this.threadsSearchForm.value.title?.trim();
        const authorName = this.threadsSearchForm.value.authorName?.trim();
        const keyWords = this.threadsSearchForm.value.keyWords?.trim();
        if (title || authorName || keyWords) {
            this.isLoading = true;
            this.forumService.searchThreads(title, authorName, keyWords).subscribe(threads => {
                this.threads = threads;
                this.isLoading = false;
            });
        }
    }

    clearSearch() {
        this.threadsSearchForm.reset();
        this.loadThreads();
    }

    isRemovalAllowed(thread: Thread) {
        return this.forumService.isThreadRemovalAllowed(thread);
    }

    removeThread(thread: Thread) {
        this.forumService.removeThread(thread.id).subscribe(
            () => this.threads = this.threads.filter(t => t.id !== thread.id));
    }

    private initThreadCreationForm() {
        this.threadCreationForm = new FormGroup({
            'threadTitle': new FormControl('', Validators.required)
        });
    }

    private initSearchForm() {
        this.threadsSearchForm = new FormGroup({
            title: new FormControl(''),
            authorName: new FormControl(''),
            keyWords: new FormControl('')
        });
    }

    private loadThreads() {
        this.forumService.getThreads().subscribe((threads: Thread[]) => {
            this.threads = threads;
            this.isLoading = false;
        });
    }
}
