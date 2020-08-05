import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { ChapterStats } from '../../../shared/model/story/chapter/chapter-stats.model';
import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { ApiService } from '../../../shared/service/util/api.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { HtmlUtil } from '../../../shared/service/util/html-util.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Subscription } from 'rxjs';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';
import GFMDataProcessor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/src/ckeditor5-markdown-gfm/gfmdataprocessor';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent implements OnInit {
  isLoading: boolean;
  storySubscription: Subscription;
  story: Story;
  chapter: Chapter; // only set if we are editing an existing chapter, null if it is a creation
  chapterContentForm: FormGroup;
  ckEditor = CustomEditor;
  ckEditorConfig: any;
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  chapterStats: ChapterStats = { words: 0, characters: 0 };

  constructor(
    private storyService: StoryService,
    private apiService: ApiService,
    private htmlUtilService: HtmlUtil,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        this.story = story;
        const chapterPosition = this.route.snapshot.params['chapterPosition'];
        if (chapterPosition) {
          this.chapter = this.story.chapters[chapterPosition - 1];
          this.chapterContentForm.patchValue({
            chapterTitle: this.chapter.title,
            chapterContent: this.chapter.content
          });
        } else {
          this.chapter = null;
        }

        this.isLoading = false;
      }
    );

    // chaque fois que les paramètres de l'URL changent (y compris au premier appel), on force l'appel de storyService.getStoryById()
    this.route.params.subscribe(
      (params: Params) => {
        this.storyService.getStoryById(+params['id']);
        // storyService nous notifiera en retour, via currentStorySuject.next(), dès qu'il aura récupéré l'histoire (opération asynchrone)
      }
    );

    this.initForm();
    this.initCkEditor();

  }

  private initForm() {
    this.chapterContentForm = new FormGroup({
      'chapterTitle': new FormControl(null, Validators.maxLength(100)),
      'chapterContent': new FormControl(null, [Validators.required])
    });
  }

  private initCkEditor() {
    this.ckEditorConfig = CkeditorConfigUtil.getCkeditorConfig(EditorType.CHAPTER);
    this.ckEditorConfig.wordCount = {
      onUpdate: (stats: ChapterStats) => this.onUpdateStats(stats)
    };
  }

  onEditorReady($event: any) {
    console.log('editorInstance:', $event);
    // console.log(CustomEditor.builtinPlugins.map(plugin => plugin.pluginName));
    // console.log(this.editorComponent);
    $event.data.processor = new GFMDataProcessor($event.editing.view.document);
  }

  onUpdateStats(stats: ChapterStats) {
    this.chapterStats = stats;
  }

  onSubmit() {
    this.chapterContentForm.markAsPristine();
    const fv = this.chapterContentForm.value;
    const title = fv.chapterTitle;
    const content = this.htmlUtilService.cleanEmptyParagraphs(fv.chapterContent);

    if (this.chapter) {
      this.apiService
        .put(`${EndpointEnum.STORIES}/${this.story.id}/chapters/${this.chapter.position}`, { title, content })
        .subscribe(response => {
          this.notificationService.success('Le chapitre a bien été mis à jour.');
        });
    } else {
      this.apiService
        .post(`${EndpointEnum.STORIES}/${this.story.id}/chapters/`, { title, content })
        .subscribe(response => {
          this.notificationService.success('Le chapitre a bien été créé.');
        });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') { // binds Ctrl|Cmd|Windows + S to submit
      event.preventDefault();
      if (this.chapterContentForm.valid && !this.chapterContentForm.pristine) {
        this.onSubmit();
      }
    }
  }

}
