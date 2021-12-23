import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { ChapterStats } from '../../../shared/model/story/chapter/chapter-stats.model';
import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { ApiService } from '../../../shared/service/util/api.service';
import { BreadcrumbService } from '../../../shared/service/util/breadcrumb/breadcrumb.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { HtmlUtil } from '../../../shared/service/util/html-util.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';
import GFMDataProcessor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/src/ckeditor5-markdown-gfm/gfmdataprocessor';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  story: Story;
  chapter: Chapter; // only set if we are editing an existing chapter, null if it is a creation
  chapterContentForm: FormGroup;
  ckEditor = CustomEditor;
  ckEditorConfig: any;
  @ViewChild('chapterTitle') chapterTitleElement: ElementRef;
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  chapterStats: ChapterStats = { words: 0, characters: 0 };

  constructor(
    private storyService: StoryService,
    private apiService: ApiService,
    private htmlUtilService: HtmlUtil,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    const routeParams = this.route.snapshot.params;

    this.storyService.getStoryById(+routeParams['id']).subscribe(story => {
      this.story = story;
      this.breadcrumbService.addSegment({ title: story.title, url: `/mon-compte/mes-histoires/${story.id}` });

      const chapterPosition = +routeParams['chapterPosition'];
      if (chapterPosition) {
        this.breadcrumbService.addSegment({ title: `Chapitre ${chapterPosition}` });

        this.chapter = this.story.chapters[chapterPosition - 1];
        this.chapterContentForm.patchValue({
          chapterTitle: this.chapter.title,
          chapterContent: this.chapter.content
        });
      } else {
        this.chapter = null;

        const chapterTitleElement: HTMLElement = this.chapterTitleElement.nativeElement;
        chapterTitleElement.focus();

        this.breadcrumbService.addSegment({ title: 'Nouveau chapitre' });
      }

      this.isLoading = false;
    });

    this.initForm();
    this.initCkEditor();

  }

  goBackToStory() {
    // navigate back to story page after a little sleep
    setTimeout(() => this.router.navigate(['/mon-compte/mes-histoires', this.story.id]), 1000);
  }

  onEditorReady(event: any) {
    // console.log('editorInstance:', event);
    // console.log(CustomEditor.builtinPlugins.map(plugin => plugin.pluginName));
    event.data.processor = new GFMDataProcessor(event.editing.view.document);
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
        .subscribe(
          () => {
            this.notificationService.success('Le chapitre a bien été mis à jour.');
            this.goBackToStory();
          },
            () => {
            this.notificationService.error('Une erreur est survenue lors de l\'enregistrement du chapitre.');
          }
        );
    } else {
      this.apiService
        .post(`${EndpointEnum.STORIES}/${this.story.id}/chapters/`, { title, content })
        .subscribe(
            () => {
            this.notificationService.success('Le chapitre a bien été créé.');
            this.goBackToStory();
          },
            () => {
            this.notificationService.error('Une erreur est survenue lors de l\'enregistrement du chapitre.');
          }
        );
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') { // binds Ctrl|Cmd + S to submit
      event.preventDefault();
      if (this.chapterContentForm.valid && !this.chapterContentForm.pristine) {
        this.onSubmit();
      }
    }
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

  ngOnDestroy() {
    this.breadcrumbService.removeLastSegment();
  }
}
