import { ForumService } from '../../shared/service/forum.service';
import { ApiService } from '../../shared/service/util/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  showCreationForm: boolean;
  threadCreationForm: FormGroup;

  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.showCreationForm = false;
    this.initForm();
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
