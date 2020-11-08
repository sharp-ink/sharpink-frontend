import { Message } from '../../../shared/model/forum/message.model';
import { Thread } from '../../../shared/model/forum/thread.model';
import { BreadcrumbService } from '../../../shared/service/util/breadcrumb/breadcrumb.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { ForumService } from '../forum.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { switchMap } from 'rxjs/operators';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';
import GFMDataProcessor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/src/ckeditor5-markdown-gfm/gfmdataprocessor';
declare const moment: any;

@Component({
  selector: 'app-read-thread',
  templateUrl: './read-thread.component.html',
  styleUrls: ['./read-thread.component.scss']
})
export class ReadThreadComponent implements OnInit {
  isLoading: boolean;
  thread: Thread;
  answerForm: FormGroup;
  ckEditor = CustomEditor;
  ckEditorConfig: any;
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;

  constructor(
    private forumService: ForumService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.pipe(
      switchMap((params: Params) => this.forumService.getThread(+params['id']))
    ).subscribe((thread: Thread) => {
      this.thread = thread;
      this.breadcrumbService.addSegment({ title: thread.title });
      this.isLoading = false;
    });

    this.initForm();
    this.initCkEditor();
  }

  onEditorReady($event: any) {
    $event.data.processor = new GFMDataProcessor($event.editing.view.document);
  }

  formatDate(date: string) {
    return moment(date, 'YYYYMMDD hh:mm:ss').fromNow();
  }

  onSubmit() {
    // creates the message and reload the thread
    this.forumService.createMessage(this.thread.id, this.answerForm.value.message).pipe(
      switchMap(() => this.forumService.getThread(this.thread.id))
    ).subscribe((thread: Thread) => {
      this.thread = thread;
      this.answerForm.reset();
    });
  }

  showActions(message: Message) {
    return this.forumService.isMessageByConnectedUser(message);
  }

  removeMessage(threadId: number, message: Message) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      this.forumService.removeMessage(threadId, message).pipe(
        switchMap(() => this.forumService.getThread(threadId))
      ).subscribe((thread: Thread) => this.thread = thread);
    }
  }

  private initForm() {
    this.answerForm = new FormGroup({
      'message': new FormControl('', Validators.required)
    });
  }

  private initCkEditor() {
    this.ckEditorConfig = CkeditorConfigUtil.getCkeditorConfig(EditorType.FORUM_MESSAGE);
  }
}
