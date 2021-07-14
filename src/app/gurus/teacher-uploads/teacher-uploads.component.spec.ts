import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUploadsComponent } from './teacher-uploads.component';

describe('TeacherUploadsComponent', () => {
  let component: TeacherUploadsComponent;
  let fixture: ComponentFixture<TeacherUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
