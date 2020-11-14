import { EditStoryService } from './edit-story.service';
import { StoryTypeEnum } from '../../../shared/constant/story-type.enum';
import { Chapter } from '../../../shared/model/story/chapter/chapter.model';
import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { BreadcrumbService } from '../../../shared/service/util/breadcrumb/breadcrumb.service';
import { CkeditorConfigUtil, EditorType } from '../../../shared/service/util/ckeditor-config-util.service';
import { NotificationService } from '../../../shared/service/util/notification.service';
import { ManageStoriesHomeService } from '../manage-stories-home/manage-stories-home.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isComponentInitialization: boolean;
  navigationExtrasState: any;
  storySubscription: Subscription;
  story: Story = null;
  storyInformationsForm: FormGroup;
  types = new Array<{ name: string, label: string }>();
  ckEditor = CustomEditor;
  ckEditorConfig: any;
  @ViewChild('summaryEditor', { static: false }) editorComponent: CKEditorComponent;
  isCropperVisible = false;
  imageChangedEvent: any = null;
  croppedImage: any = null;

  constructor(
    private storyService: StoryService,
    private manageStoriesHomeService: ManageStoriesHomeService,
    private editStoryService: EditStoryService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.navigationExtrasState = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isComponentInitialization = true;

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        this.story = story;

        this.breadcrumbService.addSegment({ title: story.title });

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

  onEditorReady(event: any) {
    if (this.navigationExtrasState?.elementToBeFocused === 'summary') {
      event.ui.element.scrollIntoView();
      event.editing.view.focus();
      this.isComponentInitialization = false;
    }
  }

  goBackToHome() {
    this.router.navigate(['/mon-compte/mes-histoires']);
  }

  updateStoryStatus(story: Story) {
    this.manageStoriesHomeService.changeStoryStatus(story).subscribe(updatedStory => {
      console.log(updatedStory);
      story.published = updatedStory.published; // reflect the new status on the page
      this.notificationService.success(
        `L'histoire est désormais <b>${story.published ? 'visible publiquement' : 'masquée'}</b>.`
      );

    });
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

  ngOnDestroy() {
    this.storySubscription.unsubscribe();
    this.breadcrumbService.removeLastSegment();
  }
}
