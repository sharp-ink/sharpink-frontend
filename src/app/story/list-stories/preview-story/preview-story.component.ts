import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/shared/model/story/story.model';
import { StoryService } from 'src/app/shared/service/story.service';



@Component({
  selector: 'app-preview-story',
  templateUrl: './preview-story.component.html',
  styleUrls: ['./preview-story.component.css']
})
export class PreviewStoryComponent implements OnInit, OnDestroy {

  story: Story = null;
  storySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
  ) { }

  ngOnInit() {

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
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

  }

  ngOnDestroy() {
    this.storySubscription.unsubscribe();
  }
}
