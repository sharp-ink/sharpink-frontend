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
  @ViewChild('threadTitleElement') threadTitleElement: ElementRef;
  threads: Thread[];

  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.isLoading = true;

    this.initForm();
    this.forumService.getThreads().subscribe((threads: Thread[]) => {
      this.threads = threads;
      this.isLoading = false;
    });
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

  ngAfterViewChecked() {
    if ((this.showCreationFormClicked || this.hideCreationFormClicked) && this.creationFormVisible) {
      const textareaElement: HTMLElement = this.threadTitleElement.nativeElement;
      textareaElement.focus();
    }

    this.showCreationFormClicked = false;
    this.hideCreationFormClicked = false;
  }

  createThread() {
    this.forumService.createThread(this.threadCreationForm.value.threadTitle).pipe(
      switchMap(() => this.forumService.getThreads())
    ).subscribe((threads) => this.threads = threads);
  }

  isRemovalAllowed(thread: Thread) {
    return this.forumService.isThreadRemovalAllowed(thread);
  }

  removeThread(thread: Thread) {
    this.forumService.removeThread(thread.id).subscribe(
      () => this.threads = this.threads.filter(t => t.id !== thread.id));
  }

  private initForm() {
    this.threadCreationForm = new FormGroup({
      'threadTitle': new FormControl('', Validators.required)
    });
  }

}
