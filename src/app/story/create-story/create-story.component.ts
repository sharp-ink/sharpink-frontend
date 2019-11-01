import { ApiError } from '../../shared/model/error/api-error.model';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Story } from 'src/app/shared/model/story.model';
import { StoryService } from 'src/app/shared/service/story.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  storyForm: FormGroup;
  createdStoryId: number; // si succès, contient l'id de l'histoire nouvellement créée
  creationError: ApiError;

  constructor(
    private storyService: StoryService
  ) { }

  ngOnInit() {
    this.initForm();
    this.creationError = null;
  }

  initForm() {
    this.storyForm = new FormGroup({
      'storyTitle': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]
      ),
      'storyIsOriginal': new FormControl('ORIGINAL', Validators.required)
    });
  }

  onSubmit() {

    const formValue = this.storyForm.value;
    const story: Story = {
      title: formValue.storyTitle,
      type: 'FANTASY',
      originalStory: (formValue.storyIsOriginal === 'ORIGINAL'),
      // TODO : remplir les champs qui suivent avec de vraies valeurs issues du formulaire
      status: 'PROGRESS',
      published: false,
      summary: '',
      authorId: 1,
      author: null,
      chaptersNumber: 0,
      chapters: [],
      creationDate: formatDate(Date.now(), 'yyyyMMdd HH:mm:ss', 'fr-FR'),
      lastModificationDate: null,
      finalReleaseDate: null
    };

    // appel au backend pour sauvegarder l'histoire en base
    this.storyService.createStoryHttpObservable(story).subscribe(
      (response) => {
        console.log(response);
        this.creationError = null;
        this.createdStoryId = response;
      },
      (error: ApiError) => {
        console.log(error);
        this.creationError = error;
        // pour ce cas-là, le serveur n'a pas renvoyé de message
        this.creationError.message =
          `Une histoire existe déjà avec ce titre : '${formValue.storyTitle}'. Veuillez réessayer avec un autre titre.`;
      }
    );

  }

}
