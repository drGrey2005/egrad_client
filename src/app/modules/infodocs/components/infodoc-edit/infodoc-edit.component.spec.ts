import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfodocEditComponent} from './infodoc-edit.component';

describe('InfodocEditComponent', () => {
  let component: InfodocEditComponent;
  let fixture: ComponentFixture<InfodocEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfodocEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfodocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
