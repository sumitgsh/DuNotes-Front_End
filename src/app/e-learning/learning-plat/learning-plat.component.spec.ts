import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlatComponent } from './learning-plat.component';

describe('LearningPlatComponent', () => {
  let component: LearningPlatComponent;
  let fixture: ComponentFixture<LearningPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
