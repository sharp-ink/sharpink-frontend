import { Story } from '../../shared/model/story/story.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoryService } from 'src/app/shared/service/story.service';



@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.css'],
  providers: []
})
export class ReadStoryComponent implements OnInit, OnDestroy {

  story: Story = null;
  storySubscription: Subscription;

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // souscrit à currentStorySubject pour que this.story soit mis à jour à chaque fois que c'est nécessaire
    this.storySubscription = this.storyService.currentStorySubject.subscribe(
      (story: Story) => {
        this.story = story;
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

  ngOnDestroy() {
    this.storySubscription.unsubscribe();
  }
}
