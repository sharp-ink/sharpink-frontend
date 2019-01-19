import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRandomComponent } from './read-random.component';

describe('ReadRandomComponent', () => {
  let component: ReadRandomComponent;
  let fixture: ComponentFixture<ReadRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
