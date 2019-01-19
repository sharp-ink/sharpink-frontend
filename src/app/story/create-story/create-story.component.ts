import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private storyService: StoryService
  ) { }

  ngOnInit() {
    this.initForm();
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
    const story: Story = new Story();
    story.title = formValue.storyTitle;
    story.type = 'FANTASY';
    story.originalStory = (formValue.storyIsOriginal === 'ORIGINAL');
    // TODO : remplir les champs qui suivent avec de vraies valeurs issues du formulaire
    story.status = 'PROGRESS';
    story.summary = '';
    story.authorId = 1;
    story.author = null;
    story.chaptersNumber = 0;
    story.chapters = [];
    story.creationDate = formatDate(Date.now(), 'yyyyMMdd HH:mm:ss', 'fr-FR');
    story.lastModificationDate = null;
    story.finalReleaseDate = null;

    // appel au backend pour sauvegarder l'histoire en base
    this.storyService.createStory(story);

  }

}
