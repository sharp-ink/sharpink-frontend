import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Story } from 'src/app/shared/model/story/story.model';



@Component({
  selector: 'app-preview-story',
  templateUrl: './preview-story.component.html',
  styleUrls: ['./preview-story.component.css']
})
export class PreviewStoryComponent {

  @Input() story: Story;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  closeAndRedirectToStoryReading() {
    this.bsModalRef.hide();
    this.router.navigate(['/histoires/lire', this.story.id]);
  }

}
