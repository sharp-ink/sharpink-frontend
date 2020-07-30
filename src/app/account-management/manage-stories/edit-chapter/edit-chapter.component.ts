import { EndpointEnum } from '../../../shared/constant/endpoint.enum';
import { ChapterStats } from '../../../shared/model/story/chapter/chapter-stats.model';
import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { ApiService } from '../../../shared/service/util/api.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { HtmlUtil } from '../../../shared/service/util/html-util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';

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
  chapterStats: ChapterStats = { words: 0, characters: 0 };

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private htmlUtilService: HtmlUtil
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

    // because the 'ready' event doesn't seem to work, we use this workaround with an arbitrary timeout... :-(
    setTimeout(() => {
      // console.log(this.editorComponent.editorInstance);
      // console.log(Array.from(this.editorComponent.editorInstance.ui.componentFactory.names()));
      // console.log(this.editorComponent.editorInstance.plugins.get('WordCount'));
    },
      1000);
  }

  private initForm() {
    this.chapterContentForm = new FormGroup({
      'chapterTitle': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      'chapterContent': new FormControl(null, [Validators.required])
    });
  }

  private initCkEditor() {
    this.ckEditorConfig = CkeditorConfigUtil.getCkeditorConfig(EditorType.CHAPTER);
    this.ckEditorConfig.wordCount = {
      onUpdate: (stats: ChapterStats) => this.onUpdateStats(stats)
    };
  }

  // NOT WORKING... :-(
  onEditorReady(event: any) {
    // console.log(ChapterEditor.builtinPlugins.map(plugin => plugin.pluginName));
    // console.log(this.editorComponent);
  }

  onUpdateStats(stats: ChapterStats) {
    this.chapterStats = stats;
  }

  onSubmit() {
    const fv = this.chapterContentForm.value;
    const title = fv.chapterTitle;
    const content = this.htmlUtilService.cleanEmptyParagraphs(fv.chapterContent);

    if (this.chapter) {
      this.apiService
        .put(`${EndpointEnum.STORIES}/${this.story.id}/chapters/${this.chapter.position}`, {  title, content })
        .subscribe(response => { console.log(response); });
    } else {
      this.apiService
        .post(`${EndpointEnum.STORIES}/${this.story.id}/chapters/`, { title, content })
        .subscribe(response => { console.log(response); });
    }
  }

}
