import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperDetailsComponent } from './paper-details.component';

describe('SubjectDetailsComponent', () => {
  let component: PaperDetailsComponent;
  let fixture: ComponentFixture<PaperDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaperDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
