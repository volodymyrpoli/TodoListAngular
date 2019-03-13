import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFieldFormComponent } from './one-field-form.component';

describe('OneFieldFormComponent', () => {
  let component: OneFieldFormComponent;
  let fixture: ComponentFixture<OneFieldFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneFieldFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
