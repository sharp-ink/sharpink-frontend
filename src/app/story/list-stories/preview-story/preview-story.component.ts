import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Story } from 'src/app/shared/model/story/story.model';



@Component({
  selector: 'app-preview-story',
  templateUrl: './preview-story.component.html',
  styleUrls: ['./preview-story.component.css']
})
export class PreviewStoryComponent implements OnInit {

  @Input() story: Story;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    /*
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        console.log(story);
        this.story = story;
      }
    );

    // chaque fois que les paramètres de l'URL changent (y compris au premier appel), on force l'appel de storyService.getStoryById()
    this.route.params.subscribe(
      (params: Params) => {
        this.storyService.getStoryById(+params['id']);
        // storyService nous notifiera en retour, via currentStorySuject.next(), dès qu'il aura récupéré l'histoire (opération asynchrone)
      }
    );
    */

  }
}
