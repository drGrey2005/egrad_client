import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OktmoEditorComponent} from './oktmo-editor.component';

describe('OktmoEditorComponent', () => {
  let component: OktmoEditorComponent;
  let fixture: ComponentFixture<OktmoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OktmoEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OktmoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
