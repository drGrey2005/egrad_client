import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocardFieldComponent } from './infocard-field.component';

describe('InfocardFieldComponent', () => {
  let component: InfocardFieldComponent;
  let fixture: ComponentFixture<InfocardFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfocardFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
