import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GurusComponent } from './gurus.component';

describe('GurusComponent', () => {
  let component: GurusComponent;
  let fixture: ComponentFixture<GurusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GurusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GurusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
