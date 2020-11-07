import { ForumService } from './forum.service';
import { Thread } from '../../shared/model/forum/thread.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  isLoading: boolean;
  showCreationForm: boolean;
  threadCreationForm: FormGroup;
  threads: Thread[];

  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.isLoading = true;

    this.showCreationForm = false;
    this.initForm();
    this.forumService.loadThreadsObservable().subscribe((threads: Thread[]) => {
      this.threads = threads;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.forumService.createThread(this.threadCreationForm.value.threadTitle);
  }

  private initForm() {
    this.threadCreationForm = new FormGroup({
      'threadTitle': new FormControl('', Validators.required)
    });
  }

}
