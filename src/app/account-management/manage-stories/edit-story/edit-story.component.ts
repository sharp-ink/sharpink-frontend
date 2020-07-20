import { Story } from '../../../shared/model/story/story.model';
import { StoryService } from '../../../shared/service/story.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  isLoading: boolean;
  storySubscription: Subscription;
  story: Story = null;

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private router: Router
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
  }

  goToNewChapter() {
    this.router.navigate(['ajouter-chapitre']);
  }
}
