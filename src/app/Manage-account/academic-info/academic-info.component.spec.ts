import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicInfoComponent } from './academic-info.component';

describe('AcademicInfoComponent', () => {
  let component: AcademicInfoComponent;
  let fixture: ComponentFixture<AcademicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
