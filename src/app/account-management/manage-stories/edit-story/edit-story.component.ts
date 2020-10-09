import { EditStoryService } from './edit-story.service';
import { StoryTypeEnum } from '../../../shared/constant/story-type.enum';
import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  isLoading: boolean;
  storySubscription: Subscription;
  story: Story = null;
  storyInformationsForm: FormGroup;
  types = new Array<{ name: string, label: string }>();
  ckEditor = CustomEditor;
  ckEditorConfig: any;
  isCropperVisible = false;
  imageChangedEvent: any = null;
  croppedImage: any = null;

  constructor(
    private storyService: StoryService,
    private editStoryService: EditStoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        this.story = story;
        this.initForm();
        this.initCkEditor();
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
  }

  goToNewChapter() {
    this.router.navigate(['ajouter-chapitre']);
  }

  // the 5 functions below are for ngx-image-croppper

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageLoaded() {
    this.isCropperVisible = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.storyInformationsForm.patchValue({
      storyThumbnail: this.croppedImage
    });
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  onSubmit() {
    this.editStoryService.updateStoryInfo(this.story, this.storyInformationsForm);
  }

  removeChapter(chapter: Chapter) {
    if (confirm('Êtes-vous sûr de vouloir supprimer le chapitre ' + chapter.position + ' - ' + chapter.title + ' ?'
      + ' ATTENTION, CETTE OPÉRATION EST IRRÉVERSIBLE!')
    ) {
      this.editStoryService.removeChapter(this.story.id, chapter.position).subscribe(
        response => {
          this.notificationService.warning(`Le chapitre a bien été supprimé.`);
          this.ngOnInit();
        }, error => {
          this.notificationService.error('Une erreur est survenue lors de la suppression du chapitre.');
        }
      );
    }
  }

  private initForm() {
    this.storyInformationsForm = new FormGroup({
      'storyTitle': new FormControl(this.story.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]
      ),
      'storyIsOriginal': new FormControl(this.story.originalStory, Validators.required),
      'storyType': new FormControl(this.story.type || ''),
      'storySummary': new FormControl(this.story.summary),
      'storyThumbnail': new FormControl('')
    });

    this.types = StoryTypeEnum.getTypesForDropdown();
  }

  private initCkEditor() {
    this.ckEditorConfig = CkeditorConfigUtil.getCkeditorConfig(EditorType.SUMMARY);
  }
}
