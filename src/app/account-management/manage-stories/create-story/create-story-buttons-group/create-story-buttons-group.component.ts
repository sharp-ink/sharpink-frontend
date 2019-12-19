import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-story-buttons-group',
  templateUrl: './create-story-buttons-group.component.html',
  styleUrls: ['./create-story-buttons-group.component.scss']
})
export class CreateStoryButtonsGroupComponent implements OnInit {
  @Input() step: number;
  @Input() saveButtonsDisabled: boolean;
  @Output() nextStep: EventEmitter<void> = new EventEmitter();
  @Output() finish: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() { }

  onPreviousStep() {
    this.router.navigate([`/mon-compte/mes-histoires/creer/etape-${this.step - 1}`]);
  }

  onNextStep() {
    this.nextStep.emit();
  }

  onFinish() {
    this.finish.emit();
  }
}
