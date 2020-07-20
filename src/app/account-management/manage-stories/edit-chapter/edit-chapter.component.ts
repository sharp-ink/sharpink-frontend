import { ChapterStats } from '../../../shared/model/chapter/chapter-stats.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Subscription } from 'rxjs';
import * as ChapterEditor from 'src/ckeditor-custom-builds/ckeditor5-build-chapter-editor/build/ckeditor';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent implements OnInit {
  isLoading: boolean;
  storySubscription: Subscription;
  story: Story;
  chapterContentForm: FormGroup;
  ckEditor = ChapterEditor;
  ckEditorConfig: any;
  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  chapterStats: ChapterStats = { words: 0, characters: 0 };

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        this.story = story;
        this.isLoading = false;
      }
    );

    // chaque fois que les paramètres de l'URL changent (y compris au premier appel), on force l'appel de storyService.getStoryById()
    this.route.params.subscribe(
      (params: Params) => {
        this.storyService.getStoryById(+params['id']);
        // storyService nous notifiera en retour, via currentStorySuject.next(), dès qu'il aura récupéré l'histoire  (opération asynchrone)
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
    this.ckEditorConfig = this.ckEditor.defaultConfig;
    this.ckEditorConfig.placeholder = 'Écrivez ou collez le contenu de votre chapitre ici...';
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
    console.log(this.chapterContentForm);
    let chapterContent = this.chapterContentForm.value.chapterContent;
    chapterContent = this.clean(chapterContent);
    console.log(chapterContent);
  }

  /**
   * Cleans the HTML input string to remove nbsp in empty paragraphs, etc...
   * @param chapterContent the HTML string representing the chapter content
   * @returns the cleaned string
   */
  clean(chapterContent: string): string {
    chapterContent = chapterContent.replace('<p>&nbsp;</p>', '<p></p>'); // cleans empty paragraphs
    return chapterContent;
  }

}
